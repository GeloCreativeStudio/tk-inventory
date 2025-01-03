import { Product } from "@/types/inventory";

export const testProducts: Product[] = [
  {
    id: "test-1",
    name: "Classic T-Shirt",
    category: "Clothing",
    price: 499,
    sku: "CLO-CTS-0001",
    variations: [
      {
        id: "var-1",
        size: "M",
        color: "Black",
        stock: 15,
        images: ["public/img_test/001BLACK.jpg"]
      },
      {
        id: "var-2",
        size: "L",
        color: "Black",
        stock: 10,
        images: ["public/img_test/001BLACK.jpg"]
      },
      {
        id: "var-3",
        size: "M",
        color: "White",
        stock: 8,
        images: ["public/img_test/001WHITE.jpg"]
      }
    ]
  },
  {
    id: "test-2",
    name: "Premium Hoodie",
    category: "Clothing",
    price: 899,
    sku: "CLO-PRH-0002",
    variations: [
      {
        id: "var-4",
        size: "S",
        color: "Blue",
        stock: 12,
        images: ["public/img_test/001WHITE.jpg"]
      },
      {
        id: "var-5",
        size: "M",
        color: "Blue",
        stock: 8,
        images: ["public/img_test/001WHITE.jpg"]
      },
      {
        id: "var-6",
        size: "L",
        color: "Red",
        stock: 5,
        images: ["public/img_test/001WHITE.jpg"]
      }
    ]
  }
];