
export type ProductCategory = "All" | "Clothing" | "Electronics" | "Footwear" ;


export interface Product{
    id: number;
    name: string;
    price: number;
    rating: number;
    category : ProductCategory;
    image : string;
}