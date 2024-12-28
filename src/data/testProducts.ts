import { Product } from "@/types/inventory";

export const testProducts: Product[] = [
  {
    id: "test-1",
    name: "Classic T-Shirt",
    category: "Clothing",
    price: 29.99,
    stock: 15,
    size: "M",
    color: "Black",
    sku: "CLO-CTS-0001",
    image: "/img_test/classic_tshirt_black.jpg"
  },
  {
    id: "test-2",
    name: "Classic T-Shirt",
    category: "Clothing",
    price: 29.99,
    stock: 8,
    size: "M",
    color: "White",
    sku: "CLO-CTS-0002",
    image: "/img_test/classic_tshirt_white.jpg"
  }
];