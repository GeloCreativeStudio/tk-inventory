import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { useToast } from "@/components/ui/use-toast";

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
  const hasErrors = Object.keys(form.formState.errors).length > 0;
  const isNewVariation = variationIndex === -1;

  const handleSave = async () => {
    const currentVariations = form.getValues("variations");
    const targetIndex = isNewVariation ? currentVariations.length - 1 : variationIndex;

    const isValid = await form.trigger([
      `variations.${targetIndex}.size`,
      `variations.${targetIndex}.color`,
      `variations.${targetIndex}.stock`,
    ]);

    if (!isValid) {
      toast({
        title: "Validation Error",
        description: "Please check all fields and try again.",
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
        </DialogHeader>
        <ScrollArea className="max-h-[calc(90vh-8rem)] px-6 pb-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProductSizeField form={form} index={variationIndex} />
              <ProductColorField form={form} index={variationIndex} />
            </div>
            <ProductStockField form={form} index={variationIndex} />
            <ProductVariationImagesField form={form} index={variationIndex} />
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
                disabled={isSubmitting || hasErrors}
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