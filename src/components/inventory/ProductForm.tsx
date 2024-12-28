import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Product } from "@/types/inventory";
import { productSchema, ProductFormValues, generateSKU } from "@/lib/validations/product";
import { v4 as uuidv4 } from "uuid";
import ProductMainFields from "./form-sections/ProductMainFields";
import ProductVariationsSection from "./form-sections/ProductVariationsSection";

interface ProductFormProps {
  onSubmit: (data: Product) => void;
  initialData?: Product;
  mode?: "create" | "edit";
}

const ProductForm = ({ onSubmit, initialData, mode = "create" }: ProductFormProps) => {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      name: "",
      category: "",
      price: 0,
      image: "",
      variations: [
        {
          id: uuidv4(),
          size: "",
          color: "",
          stock: 0,
        },
      ],
    },
  });

  const handleSubmit = (data: ProductFormValues) => {
    const productData: Product = {
      ...data,
      id: initialData?.id || uuidv4(),
      sku: mode === "create" ? generateSKU(data) : initialData?.sku || "",
      variations: data.variations.map(variation => ({
        ...variation,
        id: variation.id || uuidv4(),
      })),
    };
    onSubmit(productData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <ProductMainFields form={form} />
        <ProductVariationsSection form={form} />
        <Button type="submit" className="w-full">
          {mode === "create" ? "Add Product" : "Update Product"}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;