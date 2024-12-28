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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ProductViewDialogProps {
  product: Product | null;
  onClose: () => void;
}

const ProductViewDialog = ({ product, onClose }: ProductViewDialogProps) => {
  if (!product) return null;

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
              <div className="text-3xl font-bold text-accent">
                {formatCurrency(product.price)}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm font-medium">Category</div>
                <Badge variant="secondary">{product.category}</Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Product Variations</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Size</TableHead>
                <TableHead>Color</TableHead>
                <TableHead>Stock</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {product.variations.map((variation) => (
                <TableRow key={variation.id}>
                  <TableCell>{variation.size}</TableCell>
                  <TableCell>{variation.color}</TableCell>
                  <TableCell>
                    <StockBadge stock={variation.stock} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductViewDialog;