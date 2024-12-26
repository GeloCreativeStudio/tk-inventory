export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  size: string;
  color: string;
  sku?: string;
  image?: string;
}