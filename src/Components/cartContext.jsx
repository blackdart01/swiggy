import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartArr, setCartArr] = useState([]);

    return (
        <CartContext.Provider value={[cartArr, setCartArr]}>
            {children}
        </CartContext.Provider>
    );
};