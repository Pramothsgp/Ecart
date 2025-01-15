export type ProductCategory = "All" | "Clothing" | "Electronics" | "Footwear";

export interface Product {
  id: number;
  productName: string;
  price: number;
  description: string;
  rating: number;
  category: ProductCategory;
  image: string;
}
