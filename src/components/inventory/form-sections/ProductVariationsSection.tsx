import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "@/lib/validations/product";
import { v4 as uuidv4 } from "uuid";
import { Separator } from "@/components/ui/separator";
import ProductVariationsTable from "./ProductVariationsTable";

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
        images: [],
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

  const editVariation = (index: number) => {
    // This will be implemented in the next step with the modal
    console.log("Edit variation at index:", index);
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

      <ProductVariationsTable
        variations={form.watch("variations") || []}
        onEdit={editVariation}
        onDelete={removeVariation}
      />
    </div>
  );
};

export default ProductVariationsSection;