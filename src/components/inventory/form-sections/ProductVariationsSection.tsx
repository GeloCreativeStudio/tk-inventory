import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "@/lib/validations/product";
import { v4 as uuidv4 } from "uuid";
import { Separator } from "@/components/ui/separator";
import ProductVariationsTable from "./ProductVariationsTable";
import ProductVariationModal from "./ProductVariationModal";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProductVariationsSectionProps {
  form: UseFormReturn<ProductFormValues>;
}

const ProductVariationsSection = ({ form }: ProductVariationsSectionProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
  const { toast } = useToast();

  const addVariation = () => {
    const variations = form.getValues("variations") || [];
    const newVariation = {
      id: uuidv4(),
      size: "",
      color: "",
      stock: 0,
      images: [],
    };
    
    form.setValue("variations", [...variations, newVariation]);
    setEditingIndex(variations.length);
    setModalOpen(true);
  };

  const editVariation = (index: number) => {
    setEditingIndex(index);
    setModalOpen(true);
  };

  const removeVariation = (index: number) => {
    const currentVariations = form.getValues("variations");
    if (currentVariations.length > 1) {
      const updatedVariations = currentVariations.filter((_, i) => i !== index);
      form.setValue("variations", updatedVariations, { shouldValidate: true });
      toast({
        title: "Success",
        description: "Variation removed successfully",
      });
    } else {
      toast({
        title: "Error",
        description: "At least one variation is required",
        variant: "destructive",
      });
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingIndex(-1);

    // Clean up empty variations
    const variations = form.getValues("variations");
    const cleanedVariations = variations.filter(v => v.size && v.color);
    if (cleanedVariations.length !== variations.length) {
      form.setValue("variations", cleanedVariations);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>Product Variations</CardTitle>
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
      </CardHeader>
      <CardContent>
        <ProductVariationsTable
          variations={form.watch("variations")}
          onEdit={editVariation}
          onDelete={removeVariation}
        />

        <ProductVariationModal
          open={modalOpen}
          onClose={handleCloseModal}
          form={form}
          variationIndex={editingIndex}
        />
      </CardContent>
    </Card>
  );
};

export default ProductVariationsSection;