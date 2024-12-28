export interface ProductVariation {
  id: string;
  size: string;
  color: string;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  sku?: string;
  image?: string;
  variations: ProductVariation[];
}

export interface ProductFormValues {
  name: string;
  category: string;
  price: number;
  variations: Omit<ProductVariation, 'id'>[];
  sku?: string;
  image?: string;
}