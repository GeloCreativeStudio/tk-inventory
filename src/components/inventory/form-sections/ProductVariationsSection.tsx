import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "@/lib/validations/product";
import ProductSizeField from "../form-fields/ProductSizeField";
import ProductColorField from "../form-fields/ProductColorField";
import ProductStockField from "../form-fields/ProductStockField";
import { v4 as uuidv4 } from "uuid";
import { Separator } from "@/components/ui/separator";

interface ProductVariationsSectionProps {
  form: UseFormReturn<ProductFormValues>;
}

const ProductVariationsSection = ({ form }: ProductVariationsSectionProps) => {
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
    <div className="space-y-6">
      <Separator className="my-6" />
      
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Product Variations</h3>
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

      <div className="grid gap-4">
        {form.watch("variations")?.map((variation, index) => (
          <div
            key={variation.id}
            className="relative rounded-lg border bg-card p-4 shadow-sm"
          >
            {form.watch("variations")?.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 h-8 w-8 text-muted-foreground hover:text-destructive"
                onClick={() => removeVariation(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}

            <div className="grid gap-4 sm:grid-cols-3">
              <ProductSizeField form={form} index={index} />
              <ProductColorField form={form} index={index} />
              <ProductStockField form={form} index={index} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductVariationsSection;