import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Product } from "@/types/inventory";
import ProductNameField from "./form-fields/ProductNameField";
import ProductCategoryField from "./form-fields/ProductCategoryField";
import ProductPriceField from "./form-fields/ProductPriceField";
import ProductStockField from "./form-fields/ProductStockField";
import ProductSizeField from "./form-fields/ProductSizeField";
import ProductColorField from "./form-fields/ProductColorField";

interface ProductFormProps {
  onSubmit: (data: Partial<Product>) => void;
  initialData?: Product;
  mode?: "create" | "edit";
}

const ProductForm = ({ onSubmit, initialData, mode = "create" }: ProductFormProps) => {
  const form = useForm<Partial<Product>>({
    defaultValues: initialData || {
      name: "",
      category: "",
      price: 0,
      stock: 0,
      size: "",
      color: "",
    },
  });

  const handleSubmit = (data: Partial<Product>) => {
    const formattedData = {
      ...data,
      price: Number(data.price),
      stock: Number(data.stock),
    };
    onSubmit(formattedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <ProductNameField form={form} />
        <ProductCategoryField form={form} />
        
        <div className="grid grid-cols-2 gap-4">
          <ProductPriceField form={form} />
          <ProductStockField form={form} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <ProductSizeField form={form} />
          <ProductColorField form={form} />
        </div>

        <Button type="submit">
          {mode === "create" ? "Add Product" : "Update Product"}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;