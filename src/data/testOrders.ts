import { Order } from "@/types/orders";

export const testOrders: Order[] = [
  {
    id: "order-1",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    customerPhone: "1234567890",
    shippingAddress: "123 Main St, City",
    status: "pending",
    paymentStatus: "no_payment",
    paymentMethod: "cash",
    items: [
      {
        id: "item-1",
        productId: "test-1",
        productName: "Classic T-Shirt",
        quantity: 2,
        price: 499,
        variation: {
          size: "M",
          color: "Black"
        }
      }
    ],
    totalAmount: 998,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  },
  {
    id: "order-2",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    customerPhone: "0987654321",
    shippingAddress: "456 Oak St, Town",
    status: "completed",
    paymentStatus: "paid",
    paymentMethod: "gcash",
    items: [
      {
        id: "item-2",
        productId: "test-2",
        productName: "Premium Hoodie",
        quantity: 1,
        price: 899,
        variation: {
          size: "L",
          color: "Blue"
        }
      }
    ],
    totalAmount: 899,
    createdAt: "2024-01-02T00:00:00.000Z",
    updatedAt: "2024-01-02T00:00:00.000Z"
  }
];