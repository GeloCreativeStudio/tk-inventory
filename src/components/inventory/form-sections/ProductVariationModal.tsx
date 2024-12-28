import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import ProductSizeField from "../form-fields/ProductSizeField";
import ProductColorField from "../form-fields/ProductColorField";
import ProductStockField from "../form-fields/ProductStockField";
import ProductVariationImagesField from "../form-fields/ProductVariationImagesField";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "@/lib/validations/product";

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
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>
            {variationIndex === -1 ? "Add New Variation" : "Edit Variation"}
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
            <Button type="button" className="w-full" onClick={onClose}>
              Done
            </Button>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ProductVariationModal;