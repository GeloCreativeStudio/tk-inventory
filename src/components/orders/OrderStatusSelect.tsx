import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Order, OrderStatus } from "@/types/orders";
import { validateStatusTransition } from "@/lib/utils/orderProcessing";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface OrderStatusSelectProps {
  order: Order;
  onStatusChange: (orderId: string, newStatus: OrderStatus) => Promise<void>;
  disabled?: boolean;
}

const OrderStatusSelect = ({ order, onStatusChange, disabled }: OrderStatusSelectProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const isStaff = user?.role === 'staff';

  const handleStatusChange = async (newStatus: string) => {
    if (!validateStatusTransition(order.status, newStatus as OrderStatus)) {
      toast({
        title: "Invalid Status Change",
        description: `Cannot change order status from ${order.status} to ${newStatus}`,
        variant: "destructive",
      });
      return;
    }

    setIsUpdating(true);
    try {
      await onStatusChange(order.id, newStatus as OrderStatus);
      toast({
        title: "Status Updated",
        description: `Order status changed to ${newStatus}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Select
      defaultValue={order.status}
      onValueChange={handleStatusChange}
      disabled={disabled || isUpdating || isStaff}
    >
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pending">Pending</SelectItem>
        <SelectItem value="processing">Processing</SelectItem>
        <SelectItem value="completed">Completed</SelectItem>
        <SelectItem value="cancelled">Cancelled</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default OrderStatusSelect;