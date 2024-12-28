import { Product } from "@/types/inventory";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Classic T-Shirt",
    category: "Clothing",
    price: 29.99,
    sku: "CLO-CTS-0001",
    image: "/img_test/001BLACK.jpg",
    variations: [
      {
        id: "v1",
        size: "M",
        color: "Black",
        stock: 15,
      },
      {
        id: "v2",
        size: "L",
        color: "White",
        stock: 8,
      },
    ],
  },
  {
    id: "2",
    name: "Running Shoes",
    category: "Footwear",
    price: 89.99,
    sku: "FOO-RUS-0002",
    variations: [
      {
        id: "v3",
        size: "42",
        color: "Blue",
        stock: 5,
      },
      {
        id: "v4",
        size: "40",
        color: "Red",
        stock: 3,
      },
    ],
  },
  {
    id: "3",
    name: "Leather Wallet",
    category: "Accessories",
    price: 49.99,
    sku: "ACC-LEW-0003",
    image: "/placeholder.svg",
    variations: [
      {
        id: "v5",
        size: "M",
        color: "Brown",
        stock: 20,
      },
    ],
  },
];