import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Product } from "@/types/inventory";
import { productSchema, ProductFormValues, generateSKU } from "@/lib/validations/product";
import ProductNameField from "./form-fields/ProductNameField";
import ProductCategoryField from "./form-fields/ProductCategoryField";
import ProductPriceField from "./form-fields/ProductPriceField";
import ProductSizeField from "./form-fields/ProductSizeField";
import ProductColorField from "./form-fields/ProductColorField";
import ProductStockField from "./form-fields/ProductStockField";
import ProductImageField from "./form-fields/ProductImageField";
import { Plus, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface ProductFormProps {
  onSubmit: (data: Partial<Product>) => void;
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
    const productData = {
      ...data,
      sku: mode === "create" ? generateSKU(data) : initialData?.sku,
    };
    onSubmit(productData);
  };

  const addVariation = () => {
    const currentVariations = form.getValues("variations") || [];
    form.setValue("variations", [
      ...currentVariations,
      {
        id: uuidv4(),
        size: "",
        color: "",
        stock: 0,
      },
    ]);
  };

  const removeVariation = (index: number) => {
    const currentVariations = form.getValues("variations") || [];
    if (currentVariations.length > 1) {
      form.setValue(
        "variations",
        currentVariations.filter((_, i) => i !== index)
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <ProductNameField form={form} />
        <ProductCategoryField form={form} />
        <ProductPriceField form={form} />
        <ProductImageField form={form} />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Product Variations</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addVariation}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Variation
            </Button>
          </div>

          {form.watch("variations")?.map((variation, index) => (
            <div
              key={variation.id}
              className="space-y-4 rounded-lg border p-4 relative"
            >
              {form.watch("variations")?.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-8 w-8 text-slate-600 hover:text-red-600"
                  onClick={() => removeVariation(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}

              <div className="grid grid-cols-2 gap-4">
                <ProductSizeField form={form} index={index} />
                <ProductColorField form={form} index={index} />
              </div>
              <ProductStockField form={form} index={index} />
            </div>
          ))}
        </div>

        <Button type="submit">
          {mode === "create" ? "Add Product" : "Update Product"}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;