import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const addToCart = (item) => {
  setCart((prev) => {
    const exists = prev.find(i => i._id === item._id);

    if (exists) {
      return prev.map(i =>
        i._id === item._id
          ? { ...i, quantity: i.quantity + 1 }
          : i
      );
    } else {
      return [...prev, { ...item, quantity: 1 }];
    }
  });
};

const removeFromCart = (item) => {
  setCart((prev) => {
    const exists = prev.find(i => i._id === item._id);

    if (exists.quantity === 1) {
      return prev.filter(i => i._id !== item._id);
    }

    return prev.map(i =>
      i._id === item._id
        ? { ...i, quantity: i.quantity - 1 }
        : i
    );
  });
};

  const addToFavorites = (item) => {
    setFavorites((prev) => [...prev, item]);
  };
  const clearCart = () => {
  setCart([]);
};
const removeFromFavorites = (id) => {
  setFavorites((prev) => prev.filter(item => item._id !== id));
};
const toggleFavorite = (item) => {
  setFavorites((prev) => {
    const exists = prev.find(i => i._id === item._id);
    if (exists) {
      return prev.filter(i => i._id !== item._id);
    } else {
      return [...prev, item];
    }
  });
};

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      favorites,
      addToFavorites,
      clearCart,
      removeFromFavorites,
      toggleFavorite
    }}>
      {children}
    </CartContext.Provider>
  );
};