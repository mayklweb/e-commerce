import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items:  JSON.parse(localStorage.getItem('orders')) || [],
    totalPrice: 0,
}

function setOrder(arr) {
    localStorage.setItem('orders', JSON.stringify(arr))
    return arr
}


const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addOrder: (state, { payload }) => {
            const isContain = state.items.some(item => item.id === payload.id)
            const newOrders = isContain ? state.items.map(item => item.id === payload.id ? { ...item, qty: item.qty + 1 } : item) : [...state.items, { ...payload, qty: 1 }];
            state.items = setOrder(newOrders);
        },
        removeOrder: (state, { payload }) => {
            const newOrders = state.items = state.items.filter(item => item.id !== payload);
            state.items = setOrder(newOrders);
        },
        removeAllOrders: (state) => {
            state.items = setOrder([])
        }
    }
});

export const { addOrder, removeOrder, removeAllOrders } = orderSlice.actions

export default orderSlice.reducer