import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Product } from "@/types/inventory";
import { Badge } from "@/components/ui/badge";
import { Image } from "lucide-react";
import StockBadge from "./table/StockBadge";
import { formatCurrency } from "@/lib/utils/currency";
import { ScrollArea } from "@/components/ui/scroll-area";

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
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Product Details</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[calc(90vh-8rem)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
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
                  <Image className="h-16 w-16 text-slate-300" />
                </div>
              )}
            </div>
            
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

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium text-foreground">Category</div>
                  <Badge variant="secondary" className="text-sm">{product.category}</Badge>
                </div>

                <div className="space-y-4">
                  <div className="text-sm font-medium text-foreground">Variations</div>
                  <div className="grid gap-3">
                    {product.variations.map((variation) => (
                      <div 
                        key={variation.id}
                        className="flex items-center justify-between p-3 rounded-lg border bg-card shadow-sm"
                      >
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-foreground">
                            {variation.color} / {variation.size}
                          </div>
                          <StockBadge stock={variation.stock} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ProductViewDialog;