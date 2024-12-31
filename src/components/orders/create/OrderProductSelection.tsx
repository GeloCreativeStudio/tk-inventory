import { useState } from "react";
import { Product } from "@/types/inventory";
import { OrderItem } from "@/types/orders";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils/currency";
import { Search } from "lucide-react";
import OrderProductVariationModal from "./OrderProductVariationModal";

interface OrderProductSelectionProps {
  products: Product[];
  onSelectProduct: (item: OrderItem) => void;
}

const OrderProductSelection = ({ products, onSelectProduct }: OrderProductSelectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    onClick={() => setSelectedProduct(product)}
                  >
                    Add to Order
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <OrderProductVariationModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAdd={onSelectProduct}
      />
    </div>
  );
};

export default OrderProductSelection;