<script setup lang="ts">
import { computed, ref } from 'vue'
import { useBasketStore } from '@stores/BasketStore'
import { useProductsStore } from '@stores/ProductsStore'
import type { Product } from '@ts-types/product'

const { cardData, cardClass } = defineProps<{
    cardData: Product,
    cardClass: string
}>()

const calcPriceWithDiscount = computed(() => {
    return (cardData.price * ((100 - cardData.discountPercent) / 100)).toFixed(2).replace('.', ',')
})

const basketStore = useBasketStore()
/* exist or not in basket */
const isInBasket = computed<boolean>(() => basketStore.products.some(item => item.documentId == cardData.documentId))

const isFavorite = ref<boolean>(cardData.isFavorite ?? false)

const productsStore = useProductsStore()
const handleAddToFavorite = async () => {
    isFavorite.value = !isFavorite.value
    const statusOfUpdate = await productsStore.updateFavoriteStatus(cardData.documentId, cardData.isFavorite ?? false)
    if (!statusOfUpdate) isFavorite.value = !isFavorite.value
}

const toggleProductInBasket = (cardData: Product) => basketStore.toggleProduct(cardData)

/* computeds for classes and text */
const addToBasketBtn = computed(() => {
    return isInBasket.value ? 'button-icon add-to-basket add-to-basket--added' : 'button-icon add-to-basket'
})

const addToFavoriteBtn = computed(() => {
    return isFavorite.value ? 'button-icon add-to-favorite add-to-favorite--added' : 'button-icon add-to-favorite'
})

const addToBasketMobileBtn = computed(() => {
    return isInBasket.value ? 'button button--in-images add-to-basket img-wrapper__button visible-mobile add-to-basket--added' : 'button button--in-images add-to-basket img-wrapper__button visible-mobile'
}) 

const addToBasketMobileText = computed(() => {
    return isInBasket.value ? 'REMOVE FROM CART' : 'ADD TO CART'
}) 
</script>

<template>
    <article :class="cardClass" :id="cardData.documentId">
        <div class="img-wrapper">
            <h3 v-if="!cardData.itemsInStock" 
                :class="`${cardClass}-not-avaliable`">
                Not avaliable
            </h3>
            <div class="img-wrapper__overlay hidden-mobile"></div>
            <div v-if="cardData.discountPercent && cardData.itemsInStock" class="img-wrapper__sale-tag">
                <p>- {{ cardData.discountPercent }} %</p>
            </div>
            <RouterLink :to="{ name: 'Product', params: { id: cardData.documentId } }">
                <img :src="cardData.image" :alt="cardData.title" class="img-wrapper__image" width="300" height="300" />
            </RouterLink>
            <div class="img-wrapper__desktop-actions hidden-mobile">
                <button v-if="cardData.itemsInStock" 
                    @click="toggleProductInBasket(cardData)"
                    :class="addToBasketBtn" 
                    type="button" title="Add to cart">
                    <img src="@public/icons/basket.svg" alt="Add to basket button" width="25" height="25" loading="lazy" />
                </button>
                <RouterLink :to="{ name: 'Product', params: { id: cardData.documentId } }" 
                        class="button-icon" title="View product">
                    <img src="@public/icons/eye.svg" alt="View product" width="32" height="32" loading="lazy" />
                </RouterLink>
                <button type="button" title="Add to favorite"
                    @click="handleAddToFavorite"
                    :class="addToFavoriteBtn">
                    <svg alt="Add to favorite" width="25" height="25" aria-hidden="true" loading="lazy">
                        <use xlink:href="/src/assets/sprite.svg#icon-is-favorite"></use>
                    </svg>
                </button>
            </div>
            <button v-if="cardData.itemsInStock" 
                    @click="toggleProductInBasket(cardData)"
                    :class="addToBasketMobileBtn"
                type="button">
                {{ addToBasketMobileText }}
            </button>
        </div>
        <h3 :class="`${cardClass}-title`">
            {{ cardData.title }}
        </h3>
        <div v-if="!cardData.discountPercent" :class="`${cardClass}-pricing`">
            <h4 :class="`${cardClass}-pricing--accent`">
                $ {{ cardData.price }},00
            </h4>
        </div>
        <div v-else :class="`${cardClass}-pricing`">
            <h4 :class="`${cardClass}-pricing--crossed`">
                <del>$ {{ cardData.price }},00</del>
            </h4>
            <h4 :class="`${cardClass}-pricing--accent`">
                $ {{ calcPriceWithDiscount }}
            </h4>
        </div>
    </article>
</template>

<style src="./AppProductCard.scss" lang="scss"></style>