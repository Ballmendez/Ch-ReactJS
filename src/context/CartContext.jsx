import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addItem = (item, quantity) => {
        if (isInCart(item.id)) {
            setCart(
                cart.map((prod) =>
                    prod.id === item.id ? { ...prod, quantity: prod.quantity + quantity } : prod
                )
            );
        } else {
            setCart([...cart, { ...item, quantity }]);
        }
    };

    const removeItem = (itemId) => {
        setCart(cart.filter((prod) => prod.id !== itemId));
    };

    const updateQuantity = (itemId, newQuantity) => {
        if (newQuantity <= 0) return;
        setCart(
            cart.map((prod) => (prod.id === itemId ? { ...prod, quantity: newQuantity } : prod))
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const isInCart = (id) => {
        return cart.some((prod) => prod.id === id);
    };

    const totalQuantity = cart.reduce((acc, prod) => acc + prod.quantity, 0);

    const totalPrice = cart.reduce((acc, prod) => acc + prod.price * prod.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                totalQuantity,
                totalPrice
            }}
        >
            {children}
        </CartContext.Provider>
    );
};