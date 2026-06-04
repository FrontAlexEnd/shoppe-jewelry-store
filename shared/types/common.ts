import type { Product } from './product'

export interface BasketEvents {
    [DataAction.Add]: (product: Product) => string | void,
    [DataAction.RemoveOne]: (product: Product) => void,
    [DataAction.RemoveComplitely]: (product: Product) => void,
}

/* убрать и положить тип к слайдеру */
export interface Slide {
    id: number | string,
    mobileImage: string,
    desktopImage: string,
    product: Product,
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