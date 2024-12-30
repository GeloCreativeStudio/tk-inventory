import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils/currency";

interface OrderSummarySectionProps {
  form: UseFormReturn<any>;
}

const OrderSummarySection = ({ form }: OrderSummarySectionProps) => {
  const calculateTotal = () => {
    const items = form.watch("items");
    return items.reduce((total: number, item: any) => total + (item.price * item.quantity), 0);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {form.watch("items").map((item: any) => (
            <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <div className="font-medium">{item.productName}</div>
                <div className="text-sm text-muted-foreground">
                  {formatCurrency(item.price)} x {item.quantity}
                </div>
              </div>
              <div className="font-medium">
                {formatCurrency(item.price * item.quantity)}
              </div>
            </div>
          ))}
          <Separator />
          <div className="flex justify-between items-center font-medium text-lg">
            <span>Total</span>
            <span>{formatCurrency(calculateTotal())}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummarySection;