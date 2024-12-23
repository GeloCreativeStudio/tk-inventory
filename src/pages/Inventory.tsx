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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const categories = ["Clothing", "Footwear", "Accessories"];
const sizes = ["XS", "S", "M", "L", "XL", "32", "34", "36", "38", "40", "42"];
const colors = ["Black", "White", "Blue", "Red", "Green", "Yellow"];

const Inventory = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    category: "",
    price: 0,
    stock: 0,
    size: "",
    color: "",
  });

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
    } as const;

    return (
      <Badge variant={variants[status]}>
        {stock} in stock
      </Badge>
    );
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category || !newProduct.size || !newProduct.color) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const product: Product = {
      id: (products.length + 1).toString(),
      name: newProduct.name,
      category: newProduct.category,
      price: Number(newProduct.price) || 0,
      stock: Number(newProduct.stock) || 0,
      size: newProduct.size,
      color: newProduct.color,
    };

    setProducts([...products, product]);
    setNewProduct({
      name: "",
      category: "",
      price: 0,
      stock: 0,
      size: "",
      color: "",
    });
    setOpen(false);
    toast({
      title: "Success",
      description: "Product added successfully",
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
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Product
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, name: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newProduct.category}
                    onValueChange={(value) =>
                      setNewProduct({ ...newProduct, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        price: parseFloat(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        stock: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="size">Size</Label>
                  <Select
                    value={newProduct.size}
                    onValueChange={(value) =>
                      setNewProduct({ ...newProduct, size: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {sizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="color">Color</Label>
                  <Select
                    value={newProduct.color}
                    onValueChange={(value) =>
                      setNewProduct({ ...newProduct, color: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem key={color} value={color}>
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddProduct}>Add Product</Button>
              </div>
            </DialogContent>
          </Dialog>
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