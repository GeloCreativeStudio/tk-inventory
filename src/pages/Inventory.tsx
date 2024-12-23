import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  size: string;
  color: string;
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "T-Shirt",
    category: "Clothing",
    price: 19.99,
    stock: 50,
    size: "M",
    color: "Blue",
  },
  {
    id: "2",
    name: "Jeans",
    category: "Clothing",
    price: 49.99,
    stock: 3,
    size: "32",
    color: "Black",
  },
  {
    id: "3",
    name: "Sneakers",
    category: "Footwear",
    price: 79.99,
    stock: 15,
    size: "42",
    color: "White",
  },
];

const Inventory = () => {
  const [products] = useState<Product[]>(mockProducts);
  const { toast } = useToast();

  const getStockStatus = (stock: number) => {
    if (stock <= 5) return "critical";
    if (stock <= 10) return "warning";
    return "normal";
  };

  const getStockBadge = (stock: number) => {
    const status = getStockStatus(stock);
    const variants = {
      critical: "destructive",
      warning: "warning",
      normal: "secondary",
    };

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {stock} in stock
      </Badge>
    );
  };

  const handleAddProduct = () => {
    toast({
      title: "Coming Soon",
      description: "Product creation will be implemented in the next update.",
    });
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Inventory</h2>
            <p className="text-muted-foreground">
              Manage your inventory items here.
            </p>
          </div>
          <Button onClick={handleAddProduct}>
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Color</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{getStockBadge(product.stock)}</TableCell>
                  <TableCell>{product.size}</TableCell>
                  <TableCell>{product.color}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default Inventory;