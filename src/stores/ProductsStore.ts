import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'
import { getApiCards } from '@helpers/fetchApi'
import { API } from '@helpers/constants'
import { apiUpdateFavoriteStatus } from '@helpers/apiUpdateFavoriteStatus'
import type { Product } from '@ts-types/product'

export const useProductsStore = defineStore('productsStore', () => {
    const allProducts = ref<Product[]>([])

    onMounted(async () => {
        try {
            const data = await getApiCards<{ data: Product[] }>(API.CARDS)
            allProducts.value = data.data
        } catch (e) {
            console.error('Failed to get API products', e)
        }
    })

    const updateFavoriteStatus = async (id: string, isFavoriteStatus: boolean): Promise<boolean> => {
        const productObj = allProducts.value.find(product => product.documentId === id)
        
        if (!productObj) return false
        
        productObj.isFavorite = !productObj.isFavorite

        let statusOfUpdate = await apiUpdateFavoriteStatus(id, isFavoriteStatus)
        if (!statusOfUpdate) {
            productObj.isFavorite = !productObj.isFavorite
        }
        return statusOfUpdate
    }

    return {
        allProducts,
        updateFavoriteStatus,
    }
})
