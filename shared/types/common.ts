import type { Product } from './product'

export interface BasketEvents {
    [DataAction.Add]: (product: Product) => string | void,
    [DataAction.RemoveOne]: (product: Product) => void,
    [DataAction.RemoveComplitely]: (product: Product) => void,
}

export interface Review {
    author: string,
    documentId: string,
    rate: number,
    text: string,
}

/*  убрать и положить тип к ProductTab */
export interface ProductTab {
    tabLabel: string,
    component: Component,
    id: 'description' | 'aditional' | 'reviews',
}