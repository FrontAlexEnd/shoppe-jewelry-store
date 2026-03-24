import type { Review } from '@ts-types/index'

export interface Product {
    isFavorite?: boolean,
    color: string,
    discountPercent: number,
    documentId: string,
    image: string,
    itemsInStock: number,
    price: number,
    title: string,
}

export interface CartProduct extends Product {
    addedQuantity: number,
}

export interface InfoProduct extends Product {
    additionalImages: { additionalImages: Array<Record<string, string>> }, /* тоже что и Array<{[key: string]: string}> */
    description: string,
    SKU: number,
    size: string,
    reviews: Review[],
    weight: number,
    dimensions: string,
    material: string,
}