import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Product } from "@/types/inventory";
import { Badge } from "@/components/ui/badge";
import { Banknote, Box, Package2, Palette, Ruler } from "lucide-react";
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
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Package2 className="w-5 h-5" />
            {product.name}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[calc(90vh-8rem)]">
          <div className="space-y-6 p-4">
            {/* Basic Info Section */}
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="font-mono text-sm text-muted-foreground flex items-center gap-2">
                  <Box className="w-4 h-4" />
                  SKU: {product.sku || 'N/A'}
                </div>
                <div className="flex items-center gap-2 text-2xl font-bold text-primary">
                  <Banknote className="w-5 h-5" />
                  {formatCurrency(product.price)}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-sm">{product.category}</Badge>
                  <StockBadge stock={getTotalStock(product)} />
                </div>
              </div>

              {/* Product Image */}
              <div className="w-32 h-32 rounded-lg border bg-slate-50 overflow-hidden shrink-0">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-100">
                    <Package2 className="w-8 h-8 text-slate-300" />
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Variations Grid */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-foreground">Available Variations</h3>
              <div className="grid grid-cols-2 gap-2">
                {product.variations.map((variation) => (
                  <div 
                    key={variation.id}
                    className="flex items-center p-2 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
                  >
                    <div className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-1 items-center w-full">
                      <Ruler className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{variation.size}</span>
                      <Palette className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{variation.color}</span>
                      <StockBadge stock={variation.stock} className="col-span-2 mt-1" />
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