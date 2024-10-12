// src/context/CartContext.tsx
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface Product {
    id: number;
    name: string;
    price: string;
    description: string;
    image: string;
}

interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    cartItems: CartItem[];
}

interface CartAction {
    type: 'ADD_TO_CART' | 'REMOVE_FROM_CART' | 'ADJUST_QUANTITY';
    payload: {
        product?: Product;
        id?: number;
        quantity?: number;
    };
}

const initialState: CartState = {
    cartItems: [],
};

// Create a reducer to handle cart actions
const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const existingProduct = state.cartItems.find(item => item.id === action.payload.product?.id);
            if (existingProduct) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(item =>
                        item.id === action.payload.product?.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, { ...action.payload.product!, quantity: 1 }],
                };
            }
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== action.payload.id),
            };
        case 'ADJUST_QUANTITY':
            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                    item.id === action.payload.id ? { ...item, quantity: action.payload.quantity! } : item
                ),
            };
        default:
            return state;
    }
};

// Create the Cart Context
const CartContext = createContext<{
    state: CartState;
    addToCart: (product: Product) => void;
    removeFromCart: (id: number) => void;
    adjustQuantity: (id: number, quantity: number) => void;
}>({
    state: initialState,
    addToCart: () => { },
    removeFromCart: () => { },
    adjustQuantity: () => { },
});

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const addToCart = (product: Product) => {
        dispatch({ type: 'ADD_TO_CART', payload: { product } });
    };

    const removeFromCart = (id: number) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
    };

    const adjustQuantity = (id: number, quantity: number) => {
        dispatch({ type: 'ADJUST_QUANTITY', payload: { id, quantity } });
    };

    return (
        <CartContext.Provider value={{ state, addToCart, removeFromCart, adjustQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook to use Cart Context
export const useCart = () => {
    return useContext(CartContext);
};
