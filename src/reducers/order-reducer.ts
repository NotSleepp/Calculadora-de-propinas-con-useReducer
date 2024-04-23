import { MenuItem, OrderItem } from "../types";

export type orderActions =
    { type: 'add-item', payload: { item: MenuItem } } |
    { type: 'remove-item', payload: { id: MenuItem['id'] } } |
    { type: 'place-order' } |
    { type: 'add-tip', payload: { value: number } }


export type OrderState = {
    order: OrderItem[],
    tip: number
}


export const initialState: OrderState = {
    order: [],
    tip: 0
}

export const orderReducer = (
    state: OrderState = initialState,
    actions: orderActions
) => {

    if (actions.type === 'add-item') {

        const itemExist = state.order.find(orderItem => orderItem.id === actions.payload.item.id)
        let updatedOrder: OrderItem[] = []
        if (itemExist) {
            updatedOrder = state.order.map(orderItem => orderItem.id === actions.payload.item.id ?
                { ...orderItem, quantity: orderItem.quantity + 1 } :
                orderItem
            )
        } else {
            const newItem: OrderItem = { ...actions.payload.item, quantity: 1 }
            updatedOrder = [...state.order, newItem]
        }

        return {
            ...state,
            order: updatedOrder
        }
    }

    if (actions.type === 'remove-item') {
        const updatedOrder = state.order.filter(item => item.id !== actions.payload.id)
        return {
            ...state,
            order: updatedOrder
        }
    }

    if (actions.type === 'place-order') {
        return {
            ...state,
            order: [],
            tip: 0
        }
    }

    if (actions.type === 'add-tip') {
        const tip = actions.payload.value
        return {
            ...state,
            tip
        }
    }


    return state
}