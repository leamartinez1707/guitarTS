import { useState, useEffect, useMemo } from 'react'
import { db } from '../data/db'
import type { CartItem, Guitar } from '../types/types'

export const useCart = () => {
    const initialCart = (): CartItem[] => {
        const localCart = localStorage.getItem('cart')
        return localCart ? JSON.parse(localCart) : []
    }
    // Estados hook
    const [data] = useState(db)
    const [cart, setCart] = useState(initialCart)

    const MIN_ITEMS = 1;
    const MAX_ITEMS = 5;
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    function addToCart(item: Guitar) {
        const itemExists = cart.findIndex(guitar => guitar.id === item.id)
        if (itemExists >= 0) {
            if (cart[itemExists].quantity >= MAX_ITEMS) return;
            const updateCart = [...cart]
            updateCart[itemExists].quantity++
            setCart(updateCart)
        } else {
            const newItem: CartItem = { ...item, quantity: 1 }
            setCart([...cart, newItem])
        }
    }
    function removeFromCart(id: Guitar['id']) {
        setCart(prevCart => prevCart.filter(item => item.id !== id))
    }
    function increaseQuantity(id: Guitar['id']) {
        const updateCart = cart.map(item => {
            if (item.id === id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(updateCart)
    }
    function decreaseQuantity(id: Guitar['id']) {
        const updateCart = cart.map(item => {
            if (item.id === id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        setCart(updateCart)
    }
    function clearCart() {
        setCart([])
    }

    // State derivado
    const isEmpty = useMemo(() => cart.length === 0, [cart])
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.price * item.quantity), 0), [cart])

    return {
        data, cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, isEmpty, cartTotal
    }
}