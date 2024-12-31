import { UseFormReturn } from "react-hook-form";
import { Product } from "@/types/inventory";
import { OrderItem } from "@/types/orders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OrderProductSelection from "../OrderProductSelection";

interface OrderProductSectionProps {
  form: UseFormReturn<any>;
  products: Product[];
}

const OrderProductSection = ({ form, products }: OrderProductSectionProps) => {
  const handleProductSelect = (item: OrderItem) => {
    const currentItems = form.getValues("items");
    form.setValue("items", [...currentItems, item]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Products</CardTitle>
      </CardHeader>
      <CardContent>
        <OrderProductSelection
          products={products}
          onSelectProduct={handleProductSelect}
        />
      </CardContent>
    </Card>
  );
};

export default OrderProductSection;