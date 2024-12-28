import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils/currency";
import StockBadge from "../table/StockBadge";
import { Product } from "@/types/inventory";

interface ProductInfoSectionProps {
  product: Product;
  currentStock: number;
}

const ProductInfoSection = ({ product, currentStock }: ProductInfoSectionProps) => {
  return (
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
        <StockBadge stock={currentStock} />
      </div>

      <div className="space-y-2">
        <div className="text-sm font-medium text-foreground">Category</div>
        <Badge variant="secondary" className="text-sm">{product.category}</Badge>
      </div>
    </div>
  );
};

export default ProductInfoSection;