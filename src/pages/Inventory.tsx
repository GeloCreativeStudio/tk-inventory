import { useState } from "react";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Product } from "@/types/inventory";
import ProductTable from "@/components/inventory/ProductTable";
import ProductFilters from "@/components/inventory/ProductFilters";
import ProductViewDialog from "@/components/inventory/ProductViewDialog";
import InventoryHeader from "@/components/inventory/InventoryHeader";
import InventoryDialogs from "@/components/inventory/InventoryDialogs";
import { Dialog } from "@/components/ui/dialog";
import { mockProducts } from "@/lib/mock/inventory";

const Inventory = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [open, setOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [viewProduct, setViewProduct] = useState<Product | null>(null);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSize, setSelectedSize] = useState("all");
  const [selectedColor, setSelectedColor] = useState("all");
  const { toast } = useToast();
  const { user } = useAuth();

  const isAdmin = user?.role === 'admin';

  const handleAddProduct = (data: Partial<Product>) => {
    if (!isAdmin) {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "Only administrators can add products.",
      });
      return;
    }

    const newProduct = {
      id: (products.length + 1).toString(),
      ...data as Omit<Product, 'id'>,
    } as Product;

    setProducts([...products, newProduct]);
    setOpen(false);
    toast({
      title: "Success",
      description: "Product added successfully",
    });
  };

  const handleEditProduct = (data: Partial<Product>) => {
    if (!isAdmin) {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "Only administrators can edit products.",
      });
      return;
    }

    if (!editProduct) return;

    const updatedProducts = products.map((product) =>
      product.id === editProduct.id ? { ...product, ...data } as Product : product
    );

    setProducts(updatedProducts);
    setEditProduct(null);
    toast({
      title: "Success",
      description: "Product updated successfully",
    });
  };

  const handleDeleteConfirm = () => {
    if (!isAdmin) {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "Only administrators can delete products.",
      });
      return;
    }

    if (!deleteProduct) return;

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
    <Layout>
      <div className="space-y-8">
        <Dialog open={open} onOpenChange={setOpen}>
          <InventoryHeader setOpen={setOpen} />

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
            products={products}
            onView={setViewProduct}
            onEdit={isAdmin ? setEditProduct : undefined}
            onDelete={isAdmin ? setDeleteProduct : undefined}
          />

          <InventoryDialogs
            open={open}
            editProduct={editProduct}
            deleteProduct={deleteProduct}
            setOpen={setOpen}
            setEditProduct={setEditProduct}
            setDeleteProduct={setDeleteProduct}
            handleAddProduct={handleAddProduct}
            handleEditProduct={handleEditProduct}
            handleDeleteConfirm={handleDeleteConfirm}
          />

          <ProductViewDialog 
            product={viewProduct} 
            onClose={() => setViewProduct(null)} 
          />
        </Dialog>
      </div>
    </Layout>
  );
};

export default Inventory;