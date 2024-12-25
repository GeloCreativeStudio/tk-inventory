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
import { ImageIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

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
      <ScrollArea className="w-full whitespace-nowrap">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="w-[100px] min-w-[100px]">Image</TableHead>
              <TableHead className="min-w-[200px] font-semibold">Name</TableHead>
              <TableHead className="min-w-[120px] font-semibold">SKU</TableHead>
              <TableHead className="min-w-[150px] font-semibold">Category</TableHead>
              <TableHead className="min-w-[100px] font-semibold">Price</TableHead>
              <TableHead className="min-w-[100px] font-semibold">Stock</TableHead>
              <TableHead className="min-w-[100px] font-semibold">Size</TableHead>
              <TableHead className="min-w-[100px] font-semibold">Color</TableHead>
              <TableHead className="min-w-[100px] font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} className="hover:bg-slate-50/50">
                <TableCell className="min-w-[100px]">
                  {product.image ? (
                    <div className="relative w-16 h-16 rounded overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-16 h-16 bg-slate-100 rounded">
                      <ImageIcon className="w-6 h-6 text-slate-400" />
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium min-w-[200px]">{product.name}</TableCell>
                <TableCell className="font-mono text-sm min-w-[120px]">{product.sku}</TableCell>
                <TableCell className="min-w-[150px]">{product.category}</TableCell>
                <TableCell className="text-primary min-w-[100px]">${formatPrice(product.price)}</TableCell>
                <TableCell className="min-w-[100px]"><StockBadge stock={product.stock} /></TableCell>
                <TableCell className="min-w-[100px]">{product.size}</TableCell>
                <TableCell className="min-w-[100px]">{product.color}</TableCell>
                <TableCell className="text-right min-w-[100px]">
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
      </ScrollArea>
    </div>
  );
};

export default ProductTable;