export interface ProductVariation {
  id: string;
  size: string;
  color: string;
  stock: number;
  images: string[];  // Add support for multiple images per variation
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  sku?: string;
  image?: string;  // Keep for backward compatibility
  variations: ProductVariation[];
}