import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Product } from "@/types/inventory";
import { productSchema, generateSKU, ProductFormValues } from "@/lib/validations/product";
import ProductNameField from "./form-fields/ProductNameField";
import ProductCategoryField from "./form-fields/ProductCategoryField";
import ProductPriceField from "./form-fields/ProductPriceField";
import ProductImageField from "./form-fields/ProductImageField";
import ProductVariationsField from "./form-fields/ProductVariationsField";
import { Card, CardContent } from "@/components/ui/card";

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
      sku: initialData?.sku || "",
    },
  });

  const handleSubmit = (data: ProductFormValues) => {
    const productData: Partial<Product> = {
      ...data,
      variations: data.variations.map(variation => ({
        id: variation.id || crypto.randomUUID(),
        size: variation.size,
        color: variation.color,
        stock: variation.stock,
      })),
      sku: mode === "create" ? generateSKU(data) : initialData?.sku,
    };
    onSubmit(productData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column - Product Details */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold mb-4">Product Details</h3>
                <ProductNameField form={form} />
                <ProductCategoryField form={form} />
                <ProductPriceField form={form} />
              </div>
            </CardContent>
          </Card>

          {/* Right Column - Product Image */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold mb-4">Product Image</h3>
                <ProductImageField form={form} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section - Product Variations */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold mb-4">Product Variations</h3>
              <ProductVariationsField form={form} />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end mt-6">
          <Button type="submit" size="lg">
            {mode === "create" ? "Add Product" : "Update Product"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;