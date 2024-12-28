import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Product } from "@/types/inventory";
import { Badge } from "@/components/ui/badge";
import { Image } from "lucide-react";
import StockBadge from "./table/StockBadge";
import { formatCurrency } from "@/lib/utils/currency";

interface ProductViewDialogProps {
  product: Product | null;
  onClose: () => void;
}

const ProductViewDialog = ({ product, onClose }: ProductViewDialogProps) => {
  if (!product) return null;

  const getTotalStock = (variations: Product['variations']) => {
    return variations.reduce((total, variation) => total + variation.stock, 0);
  };

  return (
    <Dialog open={!!product} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-full max-h-[70vh] pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="space-y-4">
              {product.image ? (
                <div className="aspect-square rounded-lg overflow-hidden border bg-slate-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-square rounded-lg border bg-slate-50 flex items-center justify-center">
                  <Image className="h-16 w-16 text-slate-300" />
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold">{product.name}</h2>
                <div className="mt-2 font-mono text-sm text-muted-foreground">
                  SKU: {product.sku || 'N/A'}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-3xl font-bold text-accent">
                  {formatCurrency(product.price)}
                </div>
                <StockBadge stock={getTotalStock(product.variations)} />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Category</div>
                  <Badge variant="secondary">{product.category}</Badge>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Variations</div>
                  <div className="grid gap-2">
                    {product.variations.map((variation) => (
                      <div key={variation.id} className="flex items-center justify-between p-2 rounded-lg border">
                        <div className="flex gap-2">
                          <Badge variant="outline">{variation.size}</Badge>
                          <Badge variant="outline">{variation.color}</Badge>
                        </div>
                        <StockBadge stock={variation.stock} />
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