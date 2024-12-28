export interface ProductVariation {
  id: string;
  size: string;
  color: string;
  stock: number;
  images: string[];
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  sku?: string;
  variations: ProductVariation[];
}