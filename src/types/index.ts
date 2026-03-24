import { DataAction } from '@helpers/constants'
import type { Product } from '@ts-types/product'
import type { Component } from 'vue'

export interface BasketEvents {
    [DataAction.Add]: (product: Product) => string | void,
    [DataAction.RemoveOne]: (product: Product) => void,
    [DataAction.RemoveComplitely]: (product: Product) => void,
}

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

export interface ProductTab {
    tabLabel: string,
    component: Component,
    id: 'description' | 'aditional' | 'reviews',
}