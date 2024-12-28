import { Product } from "@/types/inventory";

export const testProducts: Product[] = [
  {
    id: "test-1",
    name: "Classic T-Shirt",
    category: "Clothing",
    price: 499,
    sku: "CLO-CTS-0001",
    image: "public/img_test/001BLACK.jpg",
    variations: [
      {
        id: "var-1",
        size: "M",
        color: "Black",
        stock: 15,
      },
      {
        id: "var-2",
        size: "L",
        color: "Black",
        stock: 10,
      }
    ]
  },
  {
    id: "test-2",
    name: "Classic T-Shirt",
    category: "Clothing",
    price: 499,
    sku: "CLO-CTS-0002",
    image: "public/img_test/001WHITE.jpg",
    variations: [
      {
        id: "var-3",
        size: "M",
        color: "White",
        stock: 8,
      },
      {
        id: "var-4",
        size: "L",
        color: "White",
        stock: 12,
      }
    ]
  }
];