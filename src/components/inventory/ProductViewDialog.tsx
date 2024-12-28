import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Product } from "@/types/inventory";
import { Badge } from "@/components/ui/badge";
import { Package2, ChevronLeft, ChevronRight } from "lucide-react";
import StockBadge from "./table/StockBadge";
import { formatCurrency } from "@/lib/utils/currency";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ProductViewDialogProps {
  product: Product | null;
  onClose: () => void;
}

const ProductViewDialog = ({ product, onClose }: ProductViewDialogProps) => {
  const [selectedVariationIndex, setSelectedVariationIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) return null;

  const getTotalStock = (product: Product) => {
    return product.variations.reduce((total, variation) => total + variation.stock, 0);
  };

  const selectedVariation = product.variations[selectedVariationIndex];
  const currentImages = selectedVariation?.images || [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === currentImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? currentImages.length - 1 : prev - 1
    );
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {/* Product Image Section */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-lg overflow-hidden border bg-slate-50 shadow-sm">
                {currentImages.length > 0 ? (
                  <>
                    <img
                      src={currentImages[currentImageIndex]}
                      alt={`${product.name} - Image ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {currentImages.length > 1 && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                          onClick={prevImage}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                          onClick={nextImage}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-slate-300">No images available</span>
                  </div>
                )}
              </div>
              {currentImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {currentImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative w-16 h-16 rounded-md overflow-hidden border-2 ${
                        index === currentImageIndex
                          ? "border-primary"
                          : "border-transparent"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Details Section */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-foreground">{product.name}</h2>
                <div className="mt-2 font-mono text-sm text-muted-foreground">
                  SKU: {product.sku || 'N/A'}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">
                  {formatCurrency(product.price)}
                </div>
                <StockBadge stock={getTotalStock(product)} />
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium text-foreground">Category</div>
                <Badge variant="secondary" className="text-sm">{product.category}</Badge>
              </div>
            </div>
          </div>

          {/* Variations Section */}
          <div className="px-6 pb-6">
            <Separator className="my-6" />
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">
                Available Variations
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {product.variations.map((variation, index) => (
                  <button
                    key={variation.id}
                    onClick={() => {
                      setSelectedVariationIndex(index);
                      setCurrentImageIndex(0);
                    }}
                    className={`text-left p-4 rounded-lg border transition-colors ${
                      index === selectedVariationIndex
                        ? "bg-primary/5 border-primary"
                        : "bg-card hover:bg-accent/5"
                    }`}
                  >
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground uppercase tracking-wider">Size</span>
                          <span className="text-sm font-medium">{variation.size}</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-xs text-muted-foreground uppercase tracking-wider">Color</span>
                          <span className="text-sm font-medium">{variation.color}</span>
                        </div>
                      </div>
                      <div className="pt-2">
                        <StockBadge stock={variation.stock} />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ProductViewDialog;