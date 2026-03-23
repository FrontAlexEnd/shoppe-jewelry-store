<script setup lang="ts">
import { computed, ref } from 'vue'
import { DataAction, TIMING, LIMIT_TEXT } from '@helpers/constants'
import type { BasketEvents } from '@ts-types/index'
import type { CartProduct  } from '@ts-types/product'

const { productData, basketEvents } = defineProps<{
    productData: CartProduct,
    basketEvents: BasketEvents,
}>()

const limitText = ref(false)

const checkEvents = (event: Event) => {
    const target = event.target as HTMLElement
    const action = target.dataset.action

    if (action && action in basketEvents) {
        const result = basketEvents[action as keyof BasketEvents](productData)

        if (result === LIMIT_TEXT) {
            showReachedLimitText()
        }
    }
}

const showReachedLimitText = (): void => {
    limitText.value = true
    setTimeout(() => limitText.value = false, TIMING.FADING_OUT)
}

const priceWithDiscount = computed<string>(() => {
    return (productData.price * ((100 - productData.discountPercent) / 100)).toFixed(2).replace('.', ',')
})
</script>

<template>
    <div class="basket__card-wrapper" :id="productData.documentId">
        <RouterLink class="basket__card-router-link" :to="{ name: 'Product', params: { id: productData.documentId }}">
            <img class="basket__card-image" :src="productData.image" :alt="productData.title" loading="lazy" />
        </RouterLink>
        <div class="basket__card-info" @click="checkEvents">
            <p class="basket__card-title">{{ productData.title }}</p>
            <p class="basket__card-color">{{ productData.color }}</p>
            <div class="basket__card-price" v-if="productData.discountPercent">
                <p class="basket__card-price--crossed"><del>
                        ${{ productData.price }},00
                    </del></p>
                <p class="basket__card-price--accent">
                    ${{ priceWithDiscount }}
                </p>
            </div>
            <div class="basket__card-price" v-else>
                <div class="basket__card-price">
                    <h4 class="basket__card-price--accent">
                        ${{ productData.price }},00
                    </h4>
                </div>
            </div>
            <button class="basket__card-delete" :data-action="DataAction.RemoveComplitely">
                <img class="basket__card-delete-img" :data-action="DataAction.RemoveComplitely"
                    src="@public/icons/delete-item.svg" alt="Delete button" loading="lazy" />
            </button>
            <Transition name="fade">
                <p v-if="limitText" class="basket__card-limit" >
                    maximum reached
                </p>
            </Transition>
            <p class="basket__card-quantity">QTY:
                <button class="basket__card-quantity-minus" :data-action="DataAction.RemoveOne">-</button>
                <span class="basket__card-quantity-counter">{{ productData.addedQuantity }}</span>
                <button class="basket__card-quantity-plus" :data-action="DataAction.Add">+</button>
            </p>
        </div>
    </div>
</template>


<style src="./AppBasketItems.scss" lang="scss"></style>