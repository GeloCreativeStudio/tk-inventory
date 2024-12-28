import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "@/lib/validations/product";
import ProductSizeField from "../form-fields/ProductSizeField";
import ProductColorField from "../form-fields/ProductColorField";
import ProductStockField from "../form-fields/ProductStockField";
import { v4 as uuidv4 } from "uuid";

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
  );
};

export default ProductVariationsSection;