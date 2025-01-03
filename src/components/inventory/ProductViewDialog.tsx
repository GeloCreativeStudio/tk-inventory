import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Product } from "@/types/inventory";
import { Package2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect } from "react";
import ProductImageSection from "./product-view/ProductImageSection";
import ProductInfoSection from "./product-view/ProductInfoSection";
import ProductVariationSection from "./product-view/ProductVariationSection";
import ProductVariationMatrix from "./product-view/ProductVariationMatrix";

interface ProductViewDialogProps {
  product: Product | null;
  onClose: () => void;
}

const ProductViewDialog = ({ product, onClose }: ProductViewDialogProps) => {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [availableColors, setAvailableColors] = useState<string[]>([]);
  const [availableSizes, setAvailableSizes] = useState<string[]>([]);

  // Get unique sizes and colors from variations
  const sizes = product ? [...new Set(product.variations.map(v => v.size))] : [];
  const colors = product ? [...new Set(product.variations.map(v => v.color))] : [];

  // Update available colors when size changes
  const handleSizeSelect = (size: string) => {
    if (!product) return;
    
    // Get colors available for the selected size
    const colorsForSize = product.variations
      .filter(v => v.size === size)
      .map(v => v.color);
    
    // Only allow deselection if there are available variations
    if (size === selectedSize && colorsForSize.length > 0) {
      setSelectedSize("");
      setAvailableColors(colors);
      return;
    }
    
    setSelectedSize(size);
    setAvailableColors(colorsForSize);
    
    // Reset color if current selection is not available for new size
    if (!colorsForSize.includes(selectedColor)) {
      setSelectedColor("");
    }
  };

  // Update available sizes when color changes
  const handleColorSelect = (color: string) => {
    if (!product) return;
    
    // Get sizes available for the selected color
    const sizesForColor = product.variations
      .filter(v => v.color === color)
      .map(v => v.size);
    
    // Only allow deselection if there are available variations
    if (color === selectedColor && sizesForColor.length > 0) {
      setSelectedColor("");
      setAvailableSizes(sizes);
      return;
    }
    
    setSelectedColor(color);
    setAvailableSizes(sizesForColor);
    
    // Reset size if current selection is not available for new color
    if (!sizesForColor.includes(selectedSize)) {
      setSelectedSize("");
    }
  };

  // Initialize available variations on component mount
  useEffect(() => {
    if (product) {
      setAvailableColors(colors);
      setAvailableSizes(sizes);
    }
  }, [product, colors, sizes]);

  if (!product) return null;

  // Find the selected variation based on size and color
  const selectedVariation = product?.variations.find(
    v => v.size === selectedSize && v.color === selectedColor
  );

  // Get images for the selected variation
  const currentImages = selectedVariation?.images || [];

  // Calculate total stock for the product
  const getTotalStock = (product: Product) => {
    return product.variations.reduce((total, variation) => total + variation.stock, 0);
  };

  // Get stock for current selection
  const getCurrentStock = () => {
    if (selectedVariation) {
      return selectedVariation.stock;
    }
    return getTotalStock(product!);
  };

  return (
    <Dialog open={!!product} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] p-0 max-w-[95vw] w-full lg:max-w-[1000px]">
        <DialogHeader className="px-8 pt-8">
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Package2 className="w-6 h-6" />
            Product Details
          </DialogTitle>
          <DialogDescription>
            View detailed information about this product
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[calc(90vh-8rem)]">
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ProductImageSection
                images={currentImages}
                currentImageIndex={currentImageIndex}
                setCurrentImageIndex={setCurrentImageIndex}
                hasSelectedVariation={!!selectedVariation}
              />
              
              <div className="space-y-8">
                <ProductInfoSection
                  product={product}
                  currentStock={getCurrentStock()}
                  hasSelectedVariation={!!selectedVariation}
                />
                
                <ProductVariationSection
                  sizes={sizes}
                  colors={colors}
                  selectedSize={selectedSize}
                  selectedColor={selectedColor}
                  onSizeSelect={handleSizeSelect}
                  onColorSelect={handleColorSelect}
                  availableColors={availableColors}
                  availableSizes={availableSizes}
                />
              </div>
            </div>

            <div className="mt-8">
              <ProductVariationMatrix product={product} />
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ProductViewDialog;