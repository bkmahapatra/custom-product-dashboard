interface variants {
  id: number;
  title: string;
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

export type { Product, variants, Discount };
