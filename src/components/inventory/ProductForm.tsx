import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Product } from "@/types/inventory";
import { productSchema, ProductFormValues, generateSKU } from "@/lib/validations/product";
import { v4 as uuidv4 } from "uuid";
import ProductNameField from "./form-fields/ProductNameField";
import ProductCategoryField from "./form-fields/ProductCategoryField";
import ProductPriceField from "./form-fields/ProductPriceField";
import ProductImageField from "./form-fields/ProductImageField";
import ProductVariationsField from "./form-fields/ProductVariationsField";

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
      image: initialData?.image || "",
      variations: initialData?.variations || [{
        id: uuidv4(),
        size: "",
        color: "",
        stock: 0,
      }],
    },
  });

  const handleSubmit = (data: ProductFormValues) => {
    const productData: Product = {
      id: initialData?.id || uuidv4(),
      name: data.name,
      category: data.category,
      price: data.price,
      sku: mode === "create" ? generateSKU(data) : initialData?.sku || "",
      image: data.image,
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <ProductNameField form={form} />
              <ProductCategoryField form={form} />
              <ProductPriceField form={form} />
            </div>
          </div>
          <div>
            <ProductImageField form={form} />
          </div>
        </div>
        
        <div className="pt-6 border-t space-y-6">
          <ProductVariationsField form={form} />
        </div>

        <div className="pt-6 border-t">
          <Button type="submit" className="w-full">
            {mode === "create" ? "Add Product" : "Update Product"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;