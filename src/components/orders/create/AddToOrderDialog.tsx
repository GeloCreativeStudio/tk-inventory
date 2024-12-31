import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Product, ProductVariation } from "@/types/inventory";
import { OrderItem } from "@/types/orders";
import { formatCurrency } from "@/lib/utils/currency";
import { useToast } from "@/components/ui/use-toast";
import ProductSizeField from "@/components/inventory/form-fields/ProductSizeField";
import ProductColorField from "@/components/inventory/form-fields/ProductColorField";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

interface AddToOrderDialogProps {
  product: Product | null;
  onClose: () => void;
  onAdd: (item: OrderItem) => void;
}

const AddToOrderDialog = ({ product, onClose, onAdd }: AddToOrderDialogProps) => {
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const form = useForm();

  if (!product) return null;

  const selectedVariation = product.variations.find(
    v => v.size === selectedSize && v.color === selectedColor
  );

  const handleAdd = () => {
    if (!selectedVariation) {
      toast({
        title: "Error",
        description: "Please select both size and color",
        variant: "destructive",
      });
      return;
    }

    if (quantity > selectedVariation.stock) {
      toast({
        title: "Error",
        description: "Quantity exceeds available stock",
        variant: "destructive",
      });
      return;
    }

    if (quantity < 1) {
      toast({
        title: "Error",
        description: "Quantity must be at least 1",
        variant: "destructive",
      });
      return;
    }

    const orderItem: OrderItem = {
      id: crypto.randomUUID(),
      productId: product.id,
      productName: product.name,
      quantity: quantity,
      price: product.price,
      variation: {
        size: selectedSize,
        color: selectedColor,
      },
    };

    onAdd(orderItem);
    onClose();
    toast({
      title: "Success",
      description: "Item added to order",
    });
  };

  return (
    <Dialog open={!!product} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add to Order</DialogTitle>
          <DialogDescription>
            Select variation and quantity for {product.name}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProductSizeField form={form} />
              <ProductColorField form={form} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Quantity</label>
              <Input
                type="number"
                min={1}
                max={selectedVariation?.stock || 1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
              {selectedVariation && (
                <p className="text-sm text-muted-foreground">
                  Available stock: {selectedVariation.stock}
                </p>
              )}
            </div>

            {selectedVariation && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Summary</p>
                <div className="bg-muted p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span>Price per item:</span>
                    <span>{formatCurrency(product.price)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quantity:</span>
                    <span>{quantity}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(product.price * quantity)}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="button"
                className="flex-1"
                onClick={handleAdd}
                disabled={!selectedVariation}
              >
                Add to Order
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddToOrderDialog;