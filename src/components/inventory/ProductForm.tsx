import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Product } from "@/types/inventory";
import { productSchema, ProductFormValues, generateSKU } from "@/lib/validations/product";
import ProductNameField from "./form-fields/ProductNameField";
import ProductCategoryField from "./form-fields/ProductCategoryField";
import ProductPriceField from "./form-fields/ProductPriceField";
import ProductImageField from "./form-fields/ProductImageField";
import ProductVariationsField from "./form-fields/ProductVariationsField";

interface ProductFormProps {
  onSubmit: (data: Partial<Product>) => void;
  initialData?: Product;
  mode?: "create" | "edit";
}

const ProductForm = ({ onSubmit, initialData, mode = "create" }: ProductFormProps) => {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initialData?.name || "",
      category: initialData?.category || "",
      price: initialData?.price || 0,
      variations: initialData?.variations || [],
      image: initialData?.image || "",
      sku: initialData?.sku,
    },
  });

  const handleSubmit = (data: ProductFormValues) => {
    const productData: Partial<Product> = {
      ...data,
      variations: data.variations.map(variation => ({
        ...variation,
        id: variation.id || crypto.randomUUID(),
      })),
      sku: mode === "create" ? generateSKU(data) : initialData?.sku,
    };
    onSubmit(productData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <ProductNameField form={form} />
        <ProductCategoryField form={form} />
        <ProductPriceField form={form} />
        <ProductVariationsField form={form} />
        <ProductImageField form={form} />

        <Button type="submit">
          {mode === "create" ? "Add Product" : "Update Product"}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;