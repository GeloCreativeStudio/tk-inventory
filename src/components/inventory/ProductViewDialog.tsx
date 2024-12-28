import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Product } from "@/types/inventory";
import { Badge } from "@/components/ui/badge";
import { Package2 } from "lucide-react";
import StockBadge from "./table/StockBadge";
import { formatCurrency } from "@/lib/utils/currency";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface ProductViewDialogProps {
  product: Product | null;
  onClose: () => void;
}

const ProductViewDialog = ({ product, onClose }: ProductViewDialogProps) => {
  if (!product) return null;

  const getTotalStock = (product: Product) => {
    return product.variations.reduce((total, variation) => total + variation.stock, 0);
  };

  return (
    <Dialog open={!!product} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Package2 className="w-6 h-6" />
            Product Details
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[calc(90vh-8rem)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {/* Product Image Section */}
            <div className="space-y-4">
              {product.image ? (
                <div className="aspect-square rounded-lg overflow-hidden border bg-slate-50 shadow-sm">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-square rounded-lg border bg-slate-50 flex items-center justify-center shadow-sm">
                  <span className="text-slate-300">No image</span>
                </div>
              )}
            </div>
            
            {/* Product Details Section */}
            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <h2 className="text-2xl font-semibold text-foreground">{product.name}</h2>
                <div className="mt-2 font-mono text-sm text-muted-foreground">
                  SKU: {product.sku || 'N/A'}
                </div>
              </div>

              {/* Price and Stock */}
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">
                  {formatCurrency(product.price)}
                </div>
                <StockBadge stock={getTotalStock(product)} />
              </div>

              {/* Category */}
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
                {product.variations.map((variation) => (
                  <div 
                    key={variation.id}
                    className="flex flex-col p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
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
                  </div>
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