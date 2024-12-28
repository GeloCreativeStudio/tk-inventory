import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Product } from "@/types/inventory";
import ProductTable from "@/components/inventory/ProductTable";
import ProductFilters from "@/components/inventory/ProductFilters";
import ProductViewDialog from "@/components/inventory/ProductViewDialog";
import InventoryHeader from "@/components/inventory/InventoryHeader";
import InventoryDialogs from "@/components/inventory/InventoryDialogs";
import { testProducts } from "@/data/testProducts";

const Inventory = () => {
  const [products, setProducts] = useState<Product[]>(testProducts);
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

  // Filter products based on search query, category, size, and color
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const searchMatch = searchQuery.trim() === "" || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.sku && product.sku.toLowerCase().includes(searchQuery.toLowerCase()));

      const categoryMatch = selectedCategory === "all" || 
        product.category.toLowerCase() === selectedCategory.toLowerCase();

      const sizeMatch = selectedSize === "all" ||
        product.variations.some(v => v.size.toLowerCase() === selectedSize.toLowerCase());

      const colorMatch = selectedColor === "all" ||
        product.variations.some(v => v.color.toLowerCase() === selectedColor.toLowerCase());

      return searchMatch && categoryMatch && sizeMatch && colorMatch;
    });
  }, [products, searchQuery, selectedCategory, selectedSize, selectedColor]);

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
      ...data as Product,
    };

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
          products={filteredProducts}
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
      </div>
    </Layout>
  );
};

export default Inventory;