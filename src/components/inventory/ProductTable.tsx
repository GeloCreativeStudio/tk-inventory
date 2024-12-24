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

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const ProductTable = ({ 
  products, 
  onEdit, 
  onDelete,
}: ProductTableProps) => {
  const formatPrice = (price: number) => {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    return !isNaN(numericPrice) ? numericPrice.toFixed(2) : '0.00';
  };

  return (
    <div className="rounded-md border bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50">
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="font-semibold">Category</TableHead>
            <TableHead className="font-semibold">Price</TableHead>
            <TableHead className="font-semibold">Stock</TableHead>
            <TableHead className="font-semibold">Size</TableHead>
            <TableHead className="font-semibold">Color</TableHead>
            <TableHead className="font-semibold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} className="hover:bg-slate-50/50">
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell className="text-primary">${formatPrice(product.price)}</TableCell>
              <TableCell><StockBadge stock={product.stock} /></TableCell>
              <TableCell>{product.size}</TableCell>
              <TableCell>{product.color}</TableCell>
              <TableCell className="text-right">
                <ProductActions 
                  product={product}
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