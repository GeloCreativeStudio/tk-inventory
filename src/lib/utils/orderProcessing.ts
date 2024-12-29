import { Order, OrderStatus } from "@/types/orders";

export const processOrder = async (order: Order, newStatus: OrderStatus): Promise<Order> => {
  // In a real app, this would be an API call
  // For now, we'll simulate the processing
  const processedOrder = {
    ...order,
    status: newStatus,
    updatedAt: new Date().toISOString()
  };

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return processedOrder;
};

export const validateStatusTransition = (currentStatus: OrderStatus, newStatus: OrderStatus): boolean => {
  const validTransitions: Record<OrderStatus, OrderStatus[]> = {
    pending: ["processing", "cancelled"],
    processing: ["completed", "cancelled"],
    completed: [],
    cancelled: []
  };

  return validTransitions[currentStatus]?.includes(newStatus) || false;
};