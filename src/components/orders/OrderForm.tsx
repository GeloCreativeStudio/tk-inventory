import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Order, OrderStatus } from "@/types/orders";
import { orderSchema, OrderFormValues } from "@/lib/validations/order";
import { v4 as uuidv4 } from "uuid";

interface OrderFormProps {
  onSubmit: (data: Order) => void;
  initialData?: Order;
  mode?: "create" | "edit";
}

const OrderForm = ({ onSubmit, initialData, mode = "create" }: OrderFormProps) => {
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      customerName: initialData?.customerName || "",
      customerEmail: initialData?.customerEmail || "",
      customerPhone: initialData?.customerPhone || "",
      shippingAddress: initialData?.shippingAddress || "",
      status: initialData?.status || "pending",
      items: initialData?.items || [],
    },
  });

  const handleSubmit = (data: OrderFormValues) => {
    const orderData: Order = {
      id: initialData?.id || uuidv4(),
      ...data,
      totalAmount: data.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      createdAt: initialData?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    onSubmit(orderData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <Input
              label="Customer Name"
              {...form.register("customerName")}
              error={form.formState.errors.customerName?.message}
            />
            <Input
              label="Email"
              type="email"
              {...form.register("customerEmail")}
              error={form.formState.errors.customerEmail?.message}
            />
          </div>
          <div className="space-y-4">
            <Input
              label="Phone"
              {...form.register("customerPhone")}
              error={form.formState.errors.customerPhone?.message}
            />
            <Select
              onValueChange={(value) => form.setValue("status", value as OrderStatus)}
              defaultValue={form.getValues("status")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Textarea
          label="Shipping Address"
          {...form.register("shippingAddress")}
          error={form.formState.errors.shippingAddress?.message}
        />
        <Button type="submit" className="w-full">
          {mode === "create" ? "Create Order" : "Update Order"}
        </Button>
      </form>
    </Form>
  );
};

export default OrderForm;