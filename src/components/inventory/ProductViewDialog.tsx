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
import { useState } from "react";
import ProductImageSection from "./product-view/ProductImageSection";
import ProductInfoSection from "./product-view/ProductInfoSection";
import ProductVariationSection from "./product-view/ProductVariationSection";

interface ProductViewDialogProps {
  product: Product | null;
  onClose: () => void;
}

const ProductViewDialog = ({ product, onClose }: ProductViewDialogProps) => {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) return null;

  // Get unique sizes and colors from variations
  const sizes = [...new Set(product.variations.map(v => v.size))];
  const colors = [...new Set(product.variations.map(v => v.color))];

  // Find the selected variation based on size and color
  const selectedVariation = product.variations.find(
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
    return getTotalStock(product);
  };

  return (
    <Dialog open={!!product} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Package2 className="w-6 h-6" />
            Product Details
          </DialogTitle>
          <DialogDescription>
            View detailed information about this product
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[calc(90vh-8rem)]">
          <div className="flex flex-col gap-6 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProductImageSection
                images={currentImages}
                currentImageIndex={currentImageIndex}
                setCurrentImageIndex={setCurrentImageIndex}
              />
              
              <ProductInfoSection
                product={product}
                currentStock={getCurrentStock()}
              />
            </div>
            
            <ProductVariationSection
              sizes={sizes}
              colors={colors}
              selectedSize={selectedSize}
              selectedColor={selectedColor}
              onSizeSelect={setSelectedSize}
              onColorSelect={setSelectedColor}
            />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ProductViewDialog;