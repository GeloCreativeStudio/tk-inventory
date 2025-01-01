import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/utils/currency";

interface OrderSummaryProps {
  price: number;
  quantity: number;
}

const OrderSummary = ({ price, quantity }: OrderSummaryProps) => {
  return (
    <div className="space-y-2">
      <Label>Summary</Label>
      <div className="bg-muted p-4 rounded-lg space-y-2">
        <div className="flex justify-between">
          <span>Price per item:</span>
          <span>{formatCurrency(price)}</span>
        </div>
        <div className="flex justify-between">
          <span>Quantity:</span>
          <span>{quantity}</span>
        </div>
        <div className="flex justify-between font-medium">
          <span>Subtotal:</span>
          <span>{formatCurrency(price * quantity)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;