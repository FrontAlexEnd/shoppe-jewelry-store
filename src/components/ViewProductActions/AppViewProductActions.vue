<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBasketStore } from '@stores/BasketStore'
import { DataAction, TIMING, LIMIT_TEXT } from '@helpers/constants'
import { useProductsStore } from '@stores/ProductsStore'
import { storeToRefs } from 'pinia'
import type { BasketEvents } from '@ts-types/index'
import type { Product } from '@ts-types/product'

const { product } = defineProps<{
    product: Product
}>()

const basketStore = useBasketStore()
const { calcQuantityOneProduct, toggleProduct, basketEvents } = basketStore
const { products } = storeToRefs(basketStore)

const checkEvents = (event: Event) => {
    const target = event.target as HTMLElement
    const action = target?.dataset.action
    if (action && action in basketEvents) {
        const result = basketEvents[action as keyof BasketEvents](product)

        if (result === LIMIT_TEXT) {
            showWarningLimitText()
        }
    }
}

const limitText = ref(false)
const showWarningLimitText = (): void => {
    limitText.value = true
    setTimeout(() => limitText.value = false, TIMING.LONG_FADING_OUT)
}

const isInBasket = computed<boolean>(() => products.value.some(item => item.documentId === product?.documentId))
const quantityInBasket = computed<number>(() => isInBasket.value ? calcQuantityOneProduct(product.documentId) : 0)

const productsStore = useProductsStore()
const modelIsFavorite = defineModel<boolean>('isFavorite', { required: true })

const handleUpdateFavoriteStatus = async () => {
    const statusOfUpdate = await productsStore.updateFavoriteStatus(product.documentId, modelIsFavorite.value)
    modelIsFavorite.value = !modelIsFavorite.value
    if (!statusOfUpdate) modelIsFavorite.value = !modelIsFavorite.value
}

/* computeds for classes and text */
const warningLimitClasses = computed(() => limitText.value ? "preview-right__events-limit" : "preview-right__events-limit hide")
const isFavoriteClasses = computed(() => modelIsFavorite.value ? 'preview-right__events-add-to-favorite add-to-favorite--added' : 'preview-right__events-add-to-favorite')
const addToBasketBtnText = computed(() =>  isInBasket.value ? 'REMOVE FROM CART' : 'ADD TO CART')
const itemInStock = computed(() => product.itemsInStock > 0 ? true : false)
</script>

<template>
    <div v-if="itemInStock" class="preview-right__events">
        <p :class="warningLimitClasses">maximum reached</p>
        <div @click="checkEvents" class="preview-right__events-basket">
            <button :data-action="DataAction.RemoveOne" class="preview-right__events-basket-minus">-</button>
            <span class="preview-right__events-basket-quantity">
                {{quantityInBasket}}
            </span>
            <button :data-action="DataAction.Add" class="preview-right__events-basket-plus">+</button>
        </div>
        <button @click="toggleProduct(product)"
                class="preview-right__events-basket-add button button--black-borders">
                {{ addToBasketBtnText }}
        </button>
    </div>
    <p v-else class="preview-right__events-unavailable">
        Unfortunately, this product is currently unavailable.
    </p>
    <button @click="handleUpdateFavoriteStatus"
            :class="isFavoriteClasses">
            <svg alt="Add to favorite" width="25" height="25" aria-hidden="true" loading="lazy">
                <use xlink:href="/src/assets/sprite.svg#icon-is-favorite"></use>
            </svg>
    </button>
</template>

<style src="./AppViewProductActions.scss" lang="scss"></style>