import { Order } from "@/types/orders";

export const testOrders: Order[] = [
  {
    id: "1",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    customerPhone: "1234567890",
    shippingAddress: "123 Main St, City, Country",
    status: "pending",
    items: [
      {
        id: "item1",
        productId: "1",
        productName: "T-Shirt",
        quantity: 2,
        price: 29.99,
        variation: {
          size: "M",
          color: "Black"
        }
      }
    ],
    totalAmount: 59.98,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "2",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    customerPhone: "0987654321",
    shippingAddress: "456 Oak St, Town, Country",
    status: "completed",
    items: [
      {
        id: "item2",
        productId: "2",
        productName: "Jeans",
        quantity: 1,
        price: 79.99,
        variation: {
          size: "L",
          color: "Blue"
        }
      }
    ],
    totalAmount: 79.99,
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 86400000).toISOString()
  }
];