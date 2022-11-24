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
  attributes: [
    {
      id: string;
      name: string;
      type: string;
      items: Items[];
    }
  ];
  prices: Price[];
  quantity: number;
}

export interface Data {
  category: {
    name: string;
    products: Products[];
  };
}

// const cartItems = [
//   {
//     id: "",
//     name: "",
//     brand: "",
//     inStock: false,
//     gallery: [],
//     description: "",
//     attributes: [
//       {
//         id: "",
//         name: "",
//         type: "",
//         items: [
//           {
//             displayValue: "",
//             value: "",
//             id: "",
//           },
//         ],
//       },
//     ],
//     prices: [
//       {
//         currency: {
//           label: "",
//           symbol: "",
//         },
//         amount: 0,
//       },
//     ],
//     quantity: 0,
//   },
// ];
