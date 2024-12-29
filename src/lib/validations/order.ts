import * as z from "zod";
import { v4 as uuidv4 } from "uuid";

const orderItemSchema = z.object({
  id: z.string().default(() => uuidv4()),
  productId: z.string().min(1, "Product is required"),
  productName: z.string().min(1, "Product name is required"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
  price: z.number().min(0, "Price must be greater than or equal to 0"),
  variation: z.object({
    size: z.string().min(1, "Size is required"),
    color: z.string().min(1, "Color is required"),
  }),
});

export const orderSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerEmail: z.string().email("Invalid email address"),
  customerPhone: z.string().min(10, "Phone number must be at least 10 characters"),
  shippingAddress: z.string().min(5, "Address must be at least 5 characters"),
  status: z.enum(['pending', 'processing', 'completed', 'cancelled']),
  items: z.array(orderItemSchema).min(1, "At least one item is required"),
});

export type OrderFormValues = z.infer<typeof orderSchema>;