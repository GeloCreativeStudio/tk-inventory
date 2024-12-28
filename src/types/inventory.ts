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

export type ProductFormValues = Omit<Product, 'id'> & {
  variations: Array<Omit<ProductVariation, 'id'> & { id?: string }>;
};