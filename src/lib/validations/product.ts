import * as z from "zod";
import { Product } from "@/types/inventory";

const productVariationSchema = z.object({
  id: z.string(),
  size: z.string().min(1, "Size is required"),
  color: z.string().min(1, "Color is required"),
  stock: z.number().int().min(0, "Stock must be greater than or equal to 0"),
});

export const productSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  category: z.string().min(1, "Category is required"),
  price: z.number().min(0, "Price must be greater than or equal to 0"),
  variations: z.array(productVariationSchema).min(1, "At least one variation is required"),
  sku: z.string().optional(),
  image: z.string().optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;

export const generateSKU = (product: Partial<Product>): string => {
  const category = product.category?.slice(0, 3).toUpperCase() || 'XXX';
  const name = product.name?.slice(0, 3).toUpperCase() || 'XXX';
  const timestamp = Date.now().toString().slice(-4);
  return `${category}-${name}-${timestamp}`;
};