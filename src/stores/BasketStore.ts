import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { DataAction, LIMIT_TEXT } from '@helpers/constants'
import type { BasketEvents } from '@ts-types/index'
import type { Product, CartProduct } from '@ts-types/product'

export const useBasketStore = defineStore('basketStore', () => {
    const products = ref<CartProduct[]>([])
    let productsInLocalStorage: CartProduct[]

    try {
        productsInLocalStorage = JSON.parse(localStorage.getItem('products') || '[]')
        products.value = productsInLocalStorage
    } catch (e) {
        console.error('Error parsing data from localStorage');
        productsInLocalStorage = []
    }

    const calcQuantityOneProduct = (documentId: string): number => {
        const getProductFromBasket = products.value.find(item => item.documentId === documentId)
        return getProductFromBasket?.addedQuantity ? getProductFromBasket.addedQuantity : 0
    }

    /* toggle basket button for cards */
    const toggleProduct = (product: Product): void => {
        const index = products.value.findIndex((item) => item.documentId === product.documentId)

        if (index !== -1) {
            products.value.splice(index, 1)
        } else {
            pushProductInStorage(product)
        }
    }

    /* delegation basket events (plus): */
    const addOneItem = (product: Product): string | void => {
        const productObj = products.value.find(item => item.documentId === product.documentId)

        if (!productObj) {
            pushProductInStorage(product)
        } else if (productObj.itemsInStock > productObj.addedQuantity) {
            ++productObj.addedQuantity
        } else {
            return LIMIT_TEXT
        }
    }

    const pushProductInStorage = (product: Product): void => {
        const productForStorage: Omit<CartProduct, 'isFavorite'> = {
            ...product,
            addedQuantity: 1,
        }
        products.value.push(productForStorage)
    }

    /* delegation basket events (minus): */
    const deleteOneItem = (product: Product): void => {
        const index = products.value.findIndex(item => item.documentId === product.documentId)
        if (index === -1) return

        const productObj = products.value[index]
        if (productObj && productObj.addedQuantity > 1) {
            --productObj.addedQuantity
        } else {
            products.value.splice(index, 1)
        }
    }

    /* delegation basket events (remove): */
    const removeCompletely = (product: Product) => {
        const index = products.value.findIndex(item => item.documentId === product.documentId)
        products.value.splice(index, 1)
    }

    const basketEvents: BasketEvents  = {
        [DataAction.Add]: addOneItem,
        [DataAction.RemoveOne]: deleteOneItem,
        [DataAction.RemoveComplitely]: removeCompletely,
    }

    /* total quantity in basket */
    const calcTotalQuantity = computed((): number => {
        let total = 0
        products.value.forEach(product => {
            total += product.addedQuantity
        })
        return total
    })

    /* total price */
    const totalPrice = computed((): string => {
        let total = 0
        products.value.forEach(product => {
            if (product.addedQuantity === 0) return
            if (product.discountPercent === 0) {
                total += product.price * product.addedQuantity
            } else {
                total += (product.price * ((100 - product.discountPercent) / 100)) * product.addedQuantity
            }
        })

        return total.toFixed(2).replace('.', ',')
    })

    /* update LS by ref products */
    watch(() => products.value, (state) => {
        localStorage.setItem('products', JSON.stringify(state))
    }, { deep: true })

    return {
        products,
        calcQuantityOneProduct,
        toggleProduct,
        basketEvents,
        calcTotalQuantity,
        totalPrice,
    }
})