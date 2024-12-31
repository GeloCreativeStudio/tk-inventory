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
import { Product } from "@/types/inventory";
import { OrderItem } from "@/types/orders";
import { formatCurrency } from "@/lib/utils/currency";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface OrderProductVariationModalProps {
  product: Product | null;
  onClose: () => void;
  onAdd: (item: OrderItem) => void;
}

const OrderProductVariationModal = ({
  product,
  onClose,
  onAdd,
}: OrderProductVariationModalProps) => {
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

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

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  return (
    <Dialog open={!!product} onOpenChange={onClose}>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Add {product.name} to Order</DialogTitle>
          <DialogDescription>
            Select variation and quantity for this product
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Size</Label>
              <Select
                value={selectedSize}
                onValueChange={setSelectedSize}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {availableSizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Color</Label>
              <Select
                value={selectedColor}
                onValueChange={setSelectedColor}
                disabled={!selectedSize}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  {availableColors.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Quantity</Label>
            <Input
              type="number"
              min={1}
              max={selectedVariation?.stock || 1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              disabled={!selectedVariation}
            />
            {selectedVariation && (
              <p className="text-sm text-muted-foreground">
                Available stock: {selectedVariation.stock}
              </p>
            )}
          </div>

          {selectedVariation && (
            <div className="space-y-2">
              <Label>Summary</Label>
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
              Add to Order
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderProductVariationModal;