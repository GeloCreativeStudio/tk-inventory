import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Order } from "@/types/orders";
import { orderSchema } from "@/lib/validations/order";
import { v4 as uuidv4 } from "uuid";

interface OrderFormProps {
  onSubmit: (data: Order) => void;
  initialData?: Order;
  mode?: "create" | "edit";
}

const OrderForm = ({ onSubmit, initialData, mode = "create" }: OrderFormProps) => {
  const form = useForm({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      customerName: initialData?.customerName || "",
      customerEmail: initialData?.customerEmail || "",
      customerPhone: initialData?.customerPhone || "",
      shippingAddress: initialData?.shippingAddress || "",
      paymentStatus: initialData?.paymentStatus || "no_payment",
      paymentMethod: initialData?.paymentMethod || "cash",
      status: initialData?.status || "pending",
      items: initialData?.items || [],
    },
  });

  const handleSubmit = (data: any) => {
    const orderData: Order = {
      id: initialData?.id || uuidv4(),
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      shippingAddress: data.shippingAddress,
      paymentStatus: data.paymentStatus,
      paymentMethod: data.paymentMethod,
      status: initialData?.status || "pending",
      items: data.items,
      totalAmount: data.items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0),
      createdAt: initialData?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    onSubmit(orderData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="customerEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="customerPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="shippingAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shipping Address</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {mode === "create" ? "Create Order" : "Update Order"}
        </Button>
      </form>
    </Form>
  );
};

export default OrderForm;
