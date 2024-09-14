
export type GuitarT = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
};

export type CartItem = GuitarT & {
  qty: number;
};

export type Cart = CartItem[];

/* interface GuitarI {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
}

interface CartItemI extends GuitarI */

export type GuitarID = GuitarT['id'];