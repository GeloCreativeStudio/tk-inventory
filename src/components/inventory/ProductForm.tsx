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
    defaultValues: {
      name: initialData?.name || "",
      category: initialData?.category || "",
      price: initialData?.price || 0,
      variations: initialData?.variations || [
        {
          id: uuidv4(),
          size: "",
          color: "",
          stock: 0,
          images: [],
        },
      ],
    },
  });

  const handleSubmit = (data: ProductFormValues) => {
    const productData: Product = {
      id: initialData?.id || uuidv4(),
      name: data.name,
      category: data.category,
      price: data.price,
      sku: mode === "create" ? generateSKU(data) : initialData?.sku || "",
      variations: data.variations.map(variation => ({
        id: variation.id || uuidv4(),
        size: variation.size,
        color: variation.color,
        stock: variation.stock,
        images: variation.images || [],
      })),
    };
    onSubmit(productData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="space-y-6">
          <ProductMainFields form={form} />
          <ProductVariationsSection form={form} />
        </div>
        <Button type="submit" className="w-full">
          {mode === "create" ? "Add Product" : "Update Product"}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;