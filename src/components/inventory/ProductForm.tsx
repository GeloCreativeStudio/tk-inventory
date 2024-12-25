import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Product } from "@/types/inventory";
import { productSchema, ProductFormValues } from "@/lib/validations/product";
import ProductNameField from "./form-fields/ProductNameField";
import ProductCategoryField from "./form-fields/ProductCategoryField";
import ProductPriceField from "./form-fields/ProductPriceField";
import ProductStockField from "./form-fields/ProductStockField";
import ProductSizeField from "./form-fields/ProductSizeField";
import ProductColorField from "./form-fields/ProductColorField";
import ProductImageField from "./form-fields/ProductImageField";
import { useState } from "react";

interface ProductFormProps {
  onSubmit: (data: Partial<Product>) => void;
  initialData?: Product;
  mode?: "create" | "edit";
}

const ProductForm = ({ onSubmit, initialData, mode = "create" }: ProductFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const generateSKU = (name: string, category: string) => {
    const timestamp = Date.now().toString().slice(-4);
    const namePrefix = name.slice(0, 3).toUpperCase();
    const categoryPrefix = category.slice(0, 2).toUpperCase();
    return `${namePrefix}-${categoryPrefix}${timestamp}`;
  };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      name: "",
      category: "",
      price: 0,
      stock: 0,
      size: "",
      color: "",
      sku: "",
      image: "",
    },
  });

  const handleSubmit = async (data: ProductFormValues) => {
    try {
      setIsSubmitting(true);
      if (mode === "create") {
        const sku = generateSKU(data.name, data.category);
        await onSubmit({ ...data, sku });
      } else {
        await onSubmit(data);
      }
    } finally {
      setIsSubmitting(false);
    }
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

        <ProductImageField form={form} />

        <Button 
          type="submit" 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting 
            ? "Processing..." 
            : mode === "create" 
              ? "Add Product" 
              : "Update Product"
          }
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;