import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ProductVariation } from "@/types/inventory";

interface QuantityInputProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
  selectedVariation: ProductVariation | undefined;
}

const QuantityInput = ({ quantity, setQuantity, selectedVariation }: QuantityInputProps) => {
  return (
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
  );
};

export default QuantityInput;