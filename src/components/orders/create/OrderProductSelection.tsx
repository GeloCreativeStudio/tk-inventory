import { useState } from "react";
import { Product } from "@/types/inventory";
import { OrderItem } from "@/types/orders";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductViewDialog from "@/components/inventory/ProductViewDialog";
import AddToOrderDialog from "./AddToOrderDialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils/currency";
import { Search } from "lucide-react";

interface OrderProductSelectionProps {
  products: Product[];
  onSelectProduct: (item: OrderItem) => void;
}

const OrderProductSelection = ({ products, onSelectProduct }: OrderProductSelectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewProduct, setViewProduct] = useState<Product | null>(null);
  const [addToOrderProduct, setAddToOrderProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{formatCurrency(product.price)}</TableCell>
                <TableCell>
                  {product.variations.reduce((total, v) => total + v.stock, 0)}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setViewProduct(product)}
                  >
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setAddToOrderProduct(product)}
                  >
                    Add to Order
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ProductViewDialog
        product={viewProduct}
        onClose={() => setViewProduct(null)}
      />

      <AddToOrderDialog
        product={addToOrderProduct}
        onClose={() => setAddToOrderProduct(null)}
        onAdd={onSelectProduct}
      />
    </div>
  );
};

export default OrderProductSelection;