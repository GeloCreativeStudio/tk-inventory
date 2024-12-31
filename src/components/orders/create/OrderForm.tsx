import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Order } from "@/types/orders";
import { orderSchema } from "@/lib/validations/order";
import { v4 as uuidv4 } from "uuid";
import OrderCustomerSection from "./sections/OrderCustomerSection";
import OrderProductSection from "./sections/OrderProductSection";
import OrderSummarySection from "./sections/OrderSummarySection";
import { Product } from "@/types/inventory";

interface OrderFormProps {
  products: Product[];
  onSubmit: (data: Order) => void;
  initialData?: Order | null;
  mode?: "create" | "edit";
}

const OrderForm = ({ 
  products, 
  onSubmit, 
  initialData, 
  mode = "create" 
}: OrderFormProps) => {
  const form = useForm({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      customerName: initialData?.customerName || "",
      customerEmail: initialData?.customerEmail || "",
      customerPhone: initialData?.customerPhone || "",
      shippingAddress: initialData?.shippingAddress || "",
      paymentStatus: initialData?.paymentStatus || "no_payment",
      paymentMethod: initialData?.paymentMethod || "cash",
      items: initialData?.items || [],
    },
  });

  const handleSubmit = (data: any) => {
    const orderData: Order = {
      id: initialData?.id || uuidv4(),
      ...data,
      status: initialData?.status || "pending",
      totalAmount: calculateTotal(),
      createdAt: initialData?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    onSubmit(orderData);
  };

  const calculateTotal = () => {
    const items = form.getValues("items");
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <OrderCustomerSection form={form} />
        <OrderProductSection form={form} products={products} />
        <OrderSummarySection form={form} products={products} />
        
        <Button type="submit" className="w-full">
          {mode === "create" ? "Create Order" : "Update Order"}
        </Button>
      </form>
    </Form>
  );
};

export default OrderForm;