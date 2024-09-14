import { CartItem, GuitarT } from "../types";
import { db } from "../data/db";

export type CartActions =
  | { type: "add-to-cart"; payload: { item: GuitarT } }
  | { type: "remove-from-cart"; payload: { id: GuitarT["id"] } }
  | { type: "increase-qty"; payload: { id: GuitarT["id"] } }
  | { type: "decrease-qty"; payload: { id: GuitarT["id"] } }
  | { type: "clear-cart" };

export type CartState = {
  data: GuitarT[];
  cart: CartItem[];
};

const defaultCart = (): CartItem[] => {
  const storedCart = localStorage.getItem("cart");
  return storedCart && storedCart != "undefined" ? JSON.parse(storedCart) : [];
};

export const initialState: CartState = {
  data: db,
  cart: defaultCart(),
};

export const cartReducer = (
  state: CartState = initialState,
  action: CartActions
) => {
  const MAX_ITEMS = 3;
  const MIN_ITEMS = 1;

  if (action.type === "add-to-cart") {
    const itemExist = state.cart.find(
      (guitar: GuitarT) => guitar.id === action.payload.item.id
    );

    let updatedCart: CartItem[] = [];
    if (itemExist) {
      updatedCart = state.cart.map((item) => {
        if (item.id === action.payload.item.id) {
          if (item.qty < MAX_ITEMS) {
            return { ...item, qty: item.qty + 1 };
          } else {
            return item;
          }
        } else {
          return item;
        }
      });
    } else {
      const newItem: CartItem = { ...action.payload.item, qty: 1 };
      updatedCart = [...state.cart, newItem];
    }

    return {
      ...state,
      cart: updatedCart,
    };
  }

  if (action.type === "remove-from-cart") {
    const updatedCart = state.cart.filter(
      (item) => item.id !== action.payload.id
    );
    return {
      ...state,
      cart: updatedCart,
    };
  }

  if (action.type === "increase-qty") {
    const updatedCart = state.cart.map((item) => {
      if (item.id === action.payload.id) {
        if (item.qty < MAX_ITEMS) {
          return { ...item, qty: item.qty + 1 };
        }
      }
      return item;
    });
    return {
      ...state,
      cart: updatedCart,
    };
  }

  if (action.type === "decrease-qty") {
    let removeFromCart = false;
    const updatedCartItem = state.cart.map((item) => {
      if (item.id === action.payload.id) {
        if (item.qty > MIN_ITEMS) {
          return { ...item, qty: item.qty - 1 };
        }
        removeFromCart = true;
        return item;
      }
      return item;
    });
    const updatedCart = removeFromCart
      ? updatedCartItem.filter((item) => item.id !== action.payload.id)
      : updatedCartItem;
    return {
      ...state,
      cart: updatedCart,
    };
  }

  if (action.type === "clear-cart") {
    return {
      ...state,
      cart: [],
    };
  }

  return {
    ...state,
  };
};
