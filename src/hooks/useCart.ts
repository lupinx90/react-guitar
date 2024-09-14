import { useState, useEffect, useMemo } from "react";
import { db } from "../data/db";
import type { GuitarT, GuitarID, CartItem, Cart } from "../types";

export const useCart= () => {
  const defaultCart = () : Cart => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  };

  const defaultGuitar: GuitarT[] = [];

  const [data, setData] = useState(defaultGuitar);
  const [cart, setCart] = useState(defaultCart);

  useEffect(() => {
    setData(db);
  }, [data]);

  useEffect(() => {
    function saveLocalStorage(): void {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    saveLocalStorage();
  }, [cart]);

  function addToCart(item: GuitarT) {
    const itemExist = cart.findIndex(
      (GuitarT: GuitarT) => GuitarT.id === item.id
    );

    if (itemExist >= 0) {
      const updatedCart = [...cart];
      updatedCart[itemExist].qty++;
      setCart(updatedCart);
    } else {
      const cartItem : CartItem = {...item, qty : 1};
      setCart([...cart, cartItem]);
    }
  }

  function removeFromCart(id: GuitarID) {
    setCart((prevCart: Cart) =>
      prevCart.filter((item: CartItem) => item.id !== id)
    );
  }

  function increaseQty(id: GuitarID) {
    const updatedCart = cart.map((item: CartItem) => {
      if (item.id === id && item.qty < 3) {
        return {
          ...item,
          qty: item.qty + 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function decreaseQty(id: GuitarID): void {
    const updatedCart = cart.map((item: CartItem) => {
      if (item.id === id && item.qty > 1) {
        return {
          ...item,
          qty: item.qty - 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function emptyCart() {
    setCart([]);
  }

  //State derivado
  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(
    () : number =>
      cart.reduce(
        (total: number, item: CartItem) => total + item.qty * item.price,
        0
      ),
    [cart]
  );

  return {
    data,
    cart,
    addToCart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    emptyCart,
    isEmpty,
    cartTotal,
  };
};
