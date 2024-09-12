interface variants {
  id: number;
  title: string;
  discounts?: Discount;
}
interface Discount {
  type: "percentage" | "fixed";
  value: number;
}
interface Product {
  id: number;
  title: string;
  discounts?: Discount;
  variants: variants[];
}

interface ProductOption {
  id: number;
  product_id: number;
  name: string;
  position: number;
  values: string[];
}

interface ProductImage {
  id: number;
  product_id: number;
  src: string;
}

interface FetchedProductVariant {
  id: number;
  product_id: number;
  title: string;
  inventory_policy: string;
  price: string;
  compare_at_price: string | null;
  option1: string;
  created_at: string;
  updated_at: string;
  inventory_quantity: number;
  admin_graphql_api_id: string;
}

interface FetechedProduct {
  id: number;
  title: string;
  vendor: string;
  handle: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  tags: string;
  options: ProductOption[];
  image: ProductImage;
  images: ProductImage[];
  admin_graphql_api_id: string;
  status: string;
  variants: FetchedProductVariant[];
}

export type {
  Product,
  variants,
  Discount,
  FetechedProduct,
  FetchedProductVariant,
};
