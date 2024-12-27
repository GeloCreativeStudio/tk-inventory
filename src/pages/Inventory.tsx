import { useState, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import ProductTable from "@/components/inventory/ProductTable";
import ProductForm from "@/components/inventory/ProductForm";
import ProductFilters from "@/components/inventory/ProductFilters";
import ProductViewDialog from "@/components/inventory/ProductViewDialog";
import { Product } from "@/types/inventory";

// Test products data
const testProducts: Product[] = [
  {
    id: "test-1",
    name: "Tatung Kalye",
    category: "Clothing",
    price: 999.00,
    stock: Math.floor(Math.random() * 20) + 1, // Random stock between 1-20
    size: ["S", "M", "L", "XL"][Math.floor(Math.random() * 4)], // Random size
    color: "Black",
    sku: "CLO-TAT-BLK",
    image: "/img_test/001BLACK.jpg"
  },
  {
    id: "test-2",
    name: "Tatung Kalye",
    category: "Clothing",
    price: 999.00,
    stock: Math.floor(Math.random() * 20) + 1, // Random stock between 1-20
    size: ["S", "M", "L", "XL"][Math.floor(Math.random() * 4)], // Random size
    color: "White",
    sku: "CLO-TAT-WHT",
    image: "/img_test/001WHITE.jpg"
  }
];

const Inventory = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>(testProducts); // Initialize with test products
  const [open, setOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [viewProduct, setViewProduct] = useState<Product | null>(null);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSize, setSelectedSize] = useState("all");
  const [selectedColor, setSelectedColor] = useState("all");
  const { toast } = useToast();

  const isAdmin = user?.role === "admin";

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        product.name.toLowerCase().includes(searchLower) ||
        (product.sku?.toLowerCase().includes(searchLower) || false);
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      const matchesSize = selectedSize === "all" || product.size === selectedSize;
      const matchesColor = selectedColor === "all" || product.color === selectedColor;

      return matchesSearch && matchesCategory && matchesSize && matchesColor;
    });
  }, [products, searchQuery, selectedCategory, selectedSize, selectedColor]);

  const handleAddProduct = (data: Partial<Product>) => {
    if (!isAdmin) return;

    const newProduct: Product = {
      id: (products.length + 1).toString(),
      ...data as Omit<Product, 'id'>,
    };

    setProducts([...products, newProduct]);
    setOpen(false);
    toast({
      title: "Success",
      description: "Product added successfully",
    });
  };

  const handleEditProduct = (data: Partial<Product>) => {
    if (!isAdmin || !editProduct) return;

    const updatedProducts = products.map((product) =>
      product.id === editProduct.id ? { ...product, ...data } : product
    );

    setProducts(updatedProducts);
    setEditProduct(null);
    toast({
      title: "Success",
      description: "Product updated successfully",
    });
  };

  const handleDeleteConfirm = () => {
    if (!isAdmin || !deleteProduct) return;

    const filteredProducts = products.filter(
      (product) => product.id !== deleteProduct.id
    );

    setProducts(filteredProducts);
    setDeleteProduct(null);
    toast({
      title: "Success",
      description: "Product deleted successfully",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Inventory</h2>
          <p className="text-muted-foreground">
            {isAdmin ? "Manage your inventory items here." : "Browse inventory items here."}
          </p>
        </div>
        {isAdmin && (
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
              <ProductForm onSubmit={handleAddProduct} />
            </DialogContent>
          </Dialog>
        )}
      </div>

      <ProductFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedSize={selectedSize}
        onSizeChange={setSelectedSize}
        selectedColor={selectedColor}
        onColorChange={setSelectedColor}
      />

      <ProductTable
        products={filteredProducts}
        onView={setViewProduct}
        onEdit={isAdmin ? setEditProduct : undefined}
        onDelete={isAdmin ? setDeleteProduct : undefined}
      />

      <ProductViewDialog 
        product={viewProduct} 
        onClose={() => setViewProduct(null)} 
      />

      {isAdmin && (
        <>
          <Dialog open={!!editProduct} onOpenChange={() => setEditProduct(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Product</DialogTitle>
              </DialogHeader>
              <ProductForm
                mode="edit"
                initialData={editProduct || undefined}
                onSubmit={handleEditProduct}
              />
            </DialogContent>
          </Dialog>

          <AlertDialog
            open={!!deleteProduct}
            onOpenChange={() => setDeleteProduct(null)}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  product from your inventory.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteConfirm}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </div>
  );
};

export default Inventory;