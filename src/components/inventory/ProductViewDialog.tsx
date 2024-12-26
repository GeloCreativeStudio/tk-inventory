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

interface ProductViewDialogProps {
  product: Product | null;
  onClose: () => void;
}

const ProductViewDialog = ({ product, onClose }: ProductViewDialogProps) => {
  if (!product) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <Dialog open={!!product} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
        </DialogHeader>
        
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
              <div className="text-3xl font-bold text-primary">
                {formatPrice(product.price)}
              </div>
              <StockBadge stock={product.stock} />
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm font-medium">Category</div>
                <Badge variant="secondary">{product.category}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Size</div>
                  <Badge variant="outline">{product.size}</Badge>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Color</div>
                  <Badge variant="outline">{product.color}</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductViewDialog;