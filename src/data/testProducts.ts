import { Product } from "@/types/inventory";

export const testProducts: Product[] = [
  {
    id: "test-1",
    name: "Classic T-Shirt",
    category: "Clothing",
    price: 499,
    stock: 15,
    size: "M",
    color: "Black",
    sku: "CLO-CTS-0001",
    image: "public/img_test/001WHITE.jpg"
  },
  {
    id: "test-2",
    name: "Classic T-Shirt",
    category: "Clothing",
    price: 499,
    stock: 8,
    size: "M",
    color: "White",
    sku: "CLO-CTS-0002",
    image: "public/img_test/001BLACK.jpg"
  }
];
