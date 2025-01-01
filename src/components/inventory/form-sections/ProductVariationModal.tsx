import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import ProductSizeField from "../form-fields/ProductSizeField";
import ProductColorField from "../form-fields/ProductColorField";
import ProductStockField from "../form-fields/ProductStockField";
import ProductVariationImagesField from "../form-fields/ProductVariationImagesField";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "@/lib/validations/product";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ProductVariationModalProps {
  open: boolean;
  onClose: () => void;
  form: UseFormReturn<ProductFormValues>;
  variationIndex: number;
}

const ProductVariationModal = ({
  open,
  onClose,
  form,
  variationIndex,
}: ProductVariationModalProps) => {
  const { toast } = useToast();
  const isSubmitting = form.formState.isSubmitting;
  const isNewVariation = variationIndex === -1;

  const handleSave = async () => {
    const currentVariations = form.getValues("variations");
    const targetIndex = isNewVariation ? currentVariations.length - 1 : variationIndex;
    const newVariation = currentVariations[targetIndex];

    // Validate required fields
    if (!newVariation.size || !newVariation.color) {
      toast({
        title: "Validation Error",
        description: "Size and color are required fields",
        variant: "destructive",
      });
      return;
    }

    // Check for duplicate variations
    const isDuplicate = currentVariations.some(
      (variation, index) =>
        index !== targetIndex &&
        variation.size === newVariation.size &&
        variation.color === newVariation.color
    );

    if (isDuplicate) {
      toast({
        title: "Error",
        description: "A variation with this size and color combination already exists",
        variant: "destructive",
      });
      return;
    }

    // Ensure stock is a valid number
    if (typeof newVariation.stock !== 'number' || newVariation.stock < 0) {
      toast({
        title: "Validation Error",
        description: "Stock must be a valid number greater than or equal to 0",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: isNewVariation 
        ? "New variation added successfully" 
        : "Variation updated successfully",
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>
            {isNewVariation ? "Add New Variation" : "Edit Variation"}
          </DialogTitle>
          <DialogDescription>
            {isNewVariation 
              ? "Add a new variation with unique size and color combination" 
              : "Modify the existing variation details"}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(90vh-8rem)]">
          <div className="px-6 pb-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Variation Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ProductSizeField form={form} index={variationIndex} />
                  <ProductColorField form={form} index={variationIndex} />
                </div>
                <ProductStockField form={form} index={variationIndex} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Images</CardTitle>
              </CardHeader>
              <CardContent>
                <ProductVariationImagesField form={form} index={variationIndex} />
              </CardContent>
            </Card>

            <Separator />

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="button"
                className="flex-1"
                onClick={handleSave}
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isNewVariation ? "Add Variation" : "Save Changes"}
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ProductVariationModal;