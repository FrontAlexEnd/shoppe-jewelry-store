<script setup lang="ts">
import { computed } from 'vue'
import AppBasketItems from '@components/BasketItems/AppBasketItems.vue'
import { useBasketStore } from '@stores/BasketStore'
import { storeToRefs } from 'pinia'
import { useUiStore } from '@stores/UiStore'

const basketStore = useBasketStore()
const { basketEvents } = basketStore
const { products,
    totalPrice,
    calcTotalQuantity: totalQuantity
} = storeToRefs(basketStore)

const uiStore = useUiStore()
const { toggleBasket } = uiStore
const { isBasketActive } = storeToRefs(uiStore)

/* computeds for classes and text */
const wordEnding = computed(() => totalQuantity.value === 1 ? 'item' : 'items')
const basketClasses = computed(() => isBasketActive.value ? 'basket basket--open' : 'basket')
const overlayClasses = computed(() => isBasketActive.value ? 'overlay active' : 'overlay')
</script>

<template>
    <aside :class="basketClasses">
        <h3 class="basket__title">Shopping bag</h3>
        <button @click="toggleBasket"
            class="basket__close">
            <img src="@public/icons/close-basket.svg" alt="Close basket">
        </button>
        <p class="basket__total-items counter">{{ totalQuantity }} {{ wordEnding }}</p>
        <div class="basket__items-wrapper" >
            <AppBasketItems 
                v-for="product in products"
                :basketEvents="basketEvents"
                :key="product.documentId" 
                :productData="product" 
            />
        </div>
        <p v-if="!totalQuantity" class="basket__empty-basket">
            Cart is empty
        </p>
        <div class="basket__bottom">
            <p class="basket__bottom-total">Subtotal
                <span class="basket__bottom-amount">
                    ({{ totalQuantity }} {{ wordEnding }})
                </span>
                <span class="basket__bottom-price">$ {{ totalPrice }}</span>
            </p>
            <button class="basket__bottom-button button button--basket">VIEW CART</button>
        </div>
    </aside>
    <div :class="overlayClasses" @click="toggleBasket"></div>
</template>

<style src="./AppBasket.scss" lang="scss"></style>