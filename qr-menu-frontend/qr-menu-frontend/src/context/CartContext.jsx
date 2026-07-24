import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    console.log("Adding Item:", item);

    const existingItem = cartItems.find(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItem) {
      const updatedItems = cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            }
          : cartItem
      );

      console.log("Updated Cart:", updatedItems);
      setCartItems(updatedItems);

    } else {
      const updatedItems = [
        ...cartItems,
        {
          ...item,
          quantity: 1,
        },
      ];

      console.log("Updated Cart:", updatedItems);
      setCartItems(updatedItems);
    }
  };

  const increaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems(
      cartItems
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const clearCart = () => {
  setCartItems([]);
};

  // Debug
  console.log("Current Cart Items:", cartItems);
  console.log("Total Items:", totalItems);
  console.log("Total Price:", totalPrice);

  return (
    <CartContext.Provider
  value={{
    cartItems,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    totalItems,
    totalPrice,
    clearCart,
  }}
>
      {children}
    </CartContext.Provider>
  );
}