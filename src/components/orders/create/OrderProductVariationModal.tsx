import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/inventory";
import { OrderItem } from "@/types/orders";
import { useToast } from "@/components/ui/use-toast";
import VariationSelectors from "./modal-sections/VariationSelectors";
import QuantityInput from "./modal-sections/QuantityInput";
import OrderSummary from "./modal-sections/OrderSummary";
import { useState } from "react";

interface OrderProductVariationModalProps {
  product: Product | null;
  onClose: () => void;
  onAdd: (item: OrderItem) => void;
  editingItem?: OrderItem;
}

const OrderProductVariationModal = ({
  product,
  onClose,
  onAdd,
  editingItem,
}: OrderProductVariationModalProps) => {
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState(editingItem?.variation.size || "");
  const [selectedColor, setSelectedColor] = useState(editingItem?.variation.color || "");
  const [quantity, setQuantity] = useState(editingItem?.quantity || 1);

  if (!product) return null;

  const selectedVariation = product.variations.find(
    (v) => v.size === selectedSize && v.color === selectedColor
  );

  const availableSizes = Array.from(
    new Set(product.variations.map((v) => v.size))
  );
  
  const availableColors = Array.from(
    new Set(
      product.variations
        .filter((v) => !selectedSize || v.size === selectedSize)
        .map((v) => v.color)
    )
  );

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

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
      id: editingItem?.id || crypto.randomUUID(),
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
      description: editingItem ? "Item updated successfully" : "Item added to order",
    });
  };

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  return (
    <Dialog open={!!product} onOpenChange={onClose}>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>{editingItem ? `Edit ${product.name}` : `Add ${product.name} to Order`}</DialogTitle>
          <DialogDescription>
            Select variation and quantity for this product
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <VariationSelectors
            product={product}
            selectedSize={selectedSize}
            selectedColor={selectedColor}
            setSelectedSize={setSelectedSize}
            setSelectedColor={setSelectedColor}
            availableSizes={availableSizes}
            availableColors={availableColors}
          />

          <QuantityInput
            quantity={quantity}
            setQuantity={setQuantity}
            selectedVariation={selectedVariation}
          />

          {selectedVariation && (
            <OrderSummary
              price={product.price}
              quantity={quantity}
            />
          )}

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="flex-1"
              onClick={handleAdd}
              disabled={!selectedVariation}
            >
              {editingItem ? 'Update Item' : 'Add to Order'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderProductVariationModal;
