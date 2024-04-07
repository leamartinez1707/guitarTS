import { db } from "../data/db";
import { CartItem, Guitar } from "../types/types";
import Swal from "sweetalert2";

export type CartActions =
    { type: 'add-to-cart', payload: { item: Guitar } } |
    { type: 'remove-from-cart', payload: { id: Guitar['id'] } } |
    { type: 'decrease-quanity', payload: { id: Guitar['id'] } } |
    { type: 'increase-quanity', payload: { id: Guitar['id'] } } |
    { type: 'clear-cart' }

export type CartState = {
    data: Guitar[],
    cart: CartItem[]
}
const initialCart = (): CartItem[] => {
    const localCart = localStorage.getItem('cart')
    return localCart ? JSON.parse(localCart) : []
}
export const initialState: CartState = {
    data: db,
    cart: initialCart()
}
const MIN_ITEMS = 1;
const MAX_ITEMS = 5;

export const cartReducer = (
    state: CartState = initialState,
    action: CartActions
) => {
    if (action.type === 'add-to-cart') {

        const itemExists = state.cart.find(guitar => guitar.id === action.payload.item.id)
        let updateCart: CartItem[] = []
        if (itemExists) {
            updateCart = state.cart.map(item => {
                if (item.id === action.payload.item.id) {
                    if (item.quantity < MAX_ITEMS) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Se agregó correctamente",
                            text: `Cantidad en carrito ${itemExists.quantity + 1}`,
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Máximo 5 unidades en el carrito!",
                        });
                        return item
                    }
                } else {
                    return item
                }
            })
        } else {
            const newItem: CartItem = { ...action.payload.item, quantity: 1 }
            updateCart = [...state.cart, newItem]
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Se agregó correctamente",
                text: `Cantidad en carrito ${newItem.quantity}`,
                showConfirmButton: false,
                timer: 1500,
            });
        }

        return {
            ...state,
            cart: updateCart

        }
    }
    if (action.type === 'remove-from-cart') {
        const updateCart = state.cart.filter(item => item.id !== action.payload.id)
        return {
            ...state,
            cart: updateCart

        }
    }
    if (action.type === 'decrease-quanity') {
        const cart = state.cart.map(item => {
            if (item.id === action.payload.id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        return {
            ...state,
            cart

        }
    }
    if (action.type === 'increase-quanity') {
        const updateCart = state.cart.map(item => {
            if (item.id === action.payload.id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        return {
            ...state,
            cart: updateCart

        }
    }
    if (action.type === 'clear-cart') {
        return {
            ...state,
            cart: []

        }
    }
}