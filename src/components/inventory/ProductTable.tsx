import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/types/inventory";
import StockBadge from "./table/StockBadge";
import ProductActions from "./table/ProductActions";
import { formatCurrency } from "@/lib/utils/currency";

interface ProductTableProps {
  products: Product[];
  onView: (product: Product) => void;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
}

const ProductTable = ({ 
  products, 
  onView,
  onEdit, 
  onDelete,
}: ProductTableProps) => {
  const getTotalStock = (product: Product) => {
    return product.variations.reduce((total, variation) => total + variation.stock, 0);
  };

  const getVariationSummary = (product: Product, field: 'size' | 'color') => {
    const unique = new Set(product.variations.map(v => v[field]));
    return Array.from(unique).join(', ');
  };

  return (
    <div className="rounded-md border bg-white shadow-sm overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50 whitespace-nowrap">
            <TableHead className="font-semibold">SKU</TableHead>
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="font-semibold">Category</TableHead>
            <TableHead className="font-semibold">Price</TableHead>
            <TableHead className="font-semibold">Total Stock</TableHead>
            <TableHead className="font-semibold">Sizes</TableHead>
            <TableHead className="font-semibold">Colors</TableHead>
            <TableHead className="font-semibold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} className="hover:bg-slate-50/50 whitespace-nowrap">
              <TableCell className="font-mono text-sm">{product.sku || '-'}</TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell className="text-accent font-medium">{formatCurrency(product.price)}</TableCell>
              <TableCell><StockBadge stock={getTotalStock(product)} /></TableCell>
              <TableCell>{getVariationSummary(product, 'size')}</TableCell>
              <TableCell>{getVariationSummary(product, 'color')}</TableCell>
              <TableCell className="text-right">
                <ProductActions 
                  product={product}
                  onView={onView}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTable;