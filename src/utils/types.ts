export interface Price {
  currency: {
    label: string;
    symbol: string;
  };
  amount: number;
}

export interface Items {
  displayValue: string;
  value: string;
  id: string;
}

export interface Attributes {
  id: string;
  name: string;
  type: string;
  items: Items[];
}

export interface Products {
  category: string;
  id: string;
  name: string;
  brand: string;
  inStock: boolean;
  gallery: Array<string>;
  description: string;
  attributes: Attributes[];
  prices: Price[];
  quantity: number;
  selectedAttrSwatch: string;
  selectedAttrText: string;
}

export interface Data {
  category: {
    name: string;
    products: Products[];
  };
}
