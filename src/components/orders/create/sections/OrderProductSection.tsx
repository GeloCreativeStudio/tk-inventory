import { UseFormReturn } from "react-hook-form";
import { Product } from "@/types/inventory";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OrderProductSelection from "../OrderProductSelection";

interface OrderProductSectionProps {
  form: UseFormReturn<any>;
  products: Product[];
}

const OrderProductSection = ({ form, products }: OrderProductSectionProps) => {
  const handleProductSelect = (product: Product) => {
    const currentItems = form.getValues("items");
    const newItem = {
      id: crypto.randomUUID(),
      productId: product.id,
      productName: product.name,
      quantity: 1,
      price: product.price,
      variation: {
        size: product.variations[0]?.size || "",
        color: product.variations[0]?.color || "",
      },
    };
    form.setValue("items", [...currentItems, newItem]);
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