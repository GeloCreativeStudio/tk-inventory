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
import { Image } from "lucide-react";
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
  return (
    <div className="rounded-md border bg-white shadow-sm overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50 whitespace-nowrap">
            <TableHead className="font-semibold w-12">Image</TableHead>
            <TableHead className="font-semibold">SKU</TableHead>
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
            <TableRow key={product.id} className="hover:bg-slate-50/50 whitespace-nowrap">
              <TableCell>
                {product.image ? (
                  <div className="w-10 h-10 rounded-md overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-md bg-slate-100 flex items-center justify-center">
                    <Image className="w-5 h-5 text-slate-400" />
                  </div>
                )}
              </TableCell>
              <TableCell className="font-mono text-sm">{product.sku || '-'}</TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell className="text-accent font-medium">{formatCurrency(product.price)}</TableCell>
              <TableCell>
                <StockBadge stock={product.variations[0]?.stock || 0} />
              </TableCell>
              <TableCell>{product.variations[0]?.size || '-'}</TableCell>
              <TableCell>{product.variations[0]?.color || '-'}</TableCell>
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