export interface Price {
  currency: {
    label: string;
    symbol: string;
  };
  amount: number;
}

export interface Currency {
  label: string;
  symbol: string;
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
  selectedSize: string | undefined;
  selectedColor: string | undefined;
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
  size: string;
  color: string;
}

export interface Data {
  category: {
    name: string;
    products: Products[];
  };
}

export interface AllData {
  category: {
    name: string;
    products: Products[];
  };
  currencies: Currency[];
}

export interface CategoryNames {
  category: {
    name: string;
    input: [
      {
        category: string;
      }
    ];
  };
}
