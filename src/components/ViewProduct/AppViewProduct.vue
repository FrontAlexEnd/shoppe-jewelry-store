<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, computed, onMounted } from 'vue'
import { getApiCards } from '@helpers/fetchApi'
import AppViewProductActions from '@components/ViewProductActions/AppViewProductActions.vue'
import AppViewProductTabs from '@components/ViewProductTabs/AppViewProductTabs.vue'
import AppSimilarItems from '@components/ViewProductSimilarItems/AppSimilarItems.vue'
import type { InfoProduct } from '@ts-types/product'

const { params: { id :productId } } = useRoute()
const product = ref<InfoProduct | null>(null)
const isFavorite = ref(false)
const fullDescription = ref(false)
const API_PRODUCT = `https://api.dev.cwe.su/api/products/${productId}?populate=*`
const SMALL_IMG_CLASS = 'preview-images__small-img'
const LARGE_IMG_CLASS = '.preview-images__large-img'

onMounted(async() => {
    try {
        const data = await getApiCards<{ data: InfoProduct }>(API_PRODUCT)
        product.value = data.data
        isFavorite.value  = product.value.isFavorite ?? false
    } catch(e) {
        console.error('Failed to get API product', e)
    }
})

const imagesArray = computed<Record<string, string> | []>(() => {
    return product.value?.additionalImages?.additionalImages[0] || []
})

const calcPriceWithDiscount = computed(() => {
    if (product.value) {
        return (product.value.price * ((100 - product.value.discountPercent) / 100)).toFixed(2).replace('.', ',')
    } else {
        return 0
    }
})

const changeImages = (event: Event) => {
    const target = event.target as HTMLImageElement
    if (target && target.classList.contains(SMALL_IMG_CLASS)) {
        const smallImage = target
        const bigImage = document.querySelector(LARGE_IMG_CLASS) as HTMLImageElement
        if (bigImage) {
            const tempSrc =  smallImage.src
            smallImage.src = bigImage.src
            bigImage.src = tempSrc
        }
    }
}

const toggleFullDescription = () => fullDescription.value = !fullDescription.value

/* raiting stars */
const calcAverageRaiting = computed<number>(() => {
    const reviews = product.value?.reviews || []
    if (reviews.length === 0 ) return 0
    
    const totalRate = reviews.reduce((acc, review) => acc + review.rate, 0)
    return totalRate / reviews.length
})

const arrayFromRaiting = computed<number[]>(() => {
    let raiting = Number(calcAverageRaiting.value.toFixed(2))
    const raitingArray: number[] = []

    /* add integers */
    while (raiting >= 1) {
        raitingArray.push(1)
        raiting = raiting - 1
    }

    const afterDot = Number((raiting - Math.floor(raiting)).toFixed(2))
    if (afterDot > 0.24 && afterDot < 0.75) {
        raitingArray.push(0.5)
    }
    /* add zeros for empty stars */
    while (raitingArray.length < 5) {
        raitingArray.push(0)
    }
    return raitingArray
})

const starClasses = (star: number) => star === 1 ? 'preview-right__star' : star === 0.5 ? 'preview-right__star preview-right__star--half' : 'preview-right__star preview-right__star--empty'

const copyLink = () => {
    return navigator.clipboard.writeText(window.location.href)
}

/* classes and text */
const rightDescriptionClasses = computed(() => {
    return fullDescription.value ? 'preview-right__info-text preview-right__info-text--show-full' : 'preview-right__info-text'
})

const showMoreDescriptionText = computed(() => fullDescription.value ? 'Hide description' : 'View more')
</script>

<template>
    <div v-if="product">
        <section class="view-product">
            <div class="view-product__preview">
                <div class="view-product__preview-images preview-images">
                    <div @click="changeImages($event)" class="preview-images__wrapper-img">
                        <img class="preview-images__small-img" 
                            v-for="image in imagesArray"  
                            :src="image" 
                            :alt="product.title">
                    </div>
                    <img class="preview-images__large-img" 
                        :src="product.image" 
                        :alt="product.title">
                </div>
                <div class="view-product__preview-right preview-right">
                    <h2 class="preview-right__title">{{product.title}}</h2>
                    <p v-if="product.discountPercent" 
                        class="preview-right__price">
                        $ {{calcPriceWithDiscount}}
                    </p>
                    <p v-else class="preview-right__price">
                        $ {{product.price}},00
                    </p>
                    <!-- raiting stars -->
                    <div v-if="calcAverageRaiting" class="preview-right__raiting">
                        <svg v-for="star in arrayFromRaiting"
                            :class="starClasses(star)"
                            aria-hidden="true" width="18">
                            <use v-if="star == 0.5" xlink:href="@assets/sprite.svg#half-star-raiting"></use>
                            <use v-else xlink:href="@assets/sprite.svg#star-raiting"></use>
                        </svg>
                        <p class="preview-right__raiting-text">
                            {{ product.reviews?.length }} customer reviews
                        </p>
                        <button @:click="copyLink" class="preview-right__share-btn" type="button" aria-label="share product">
                            <img src="@public/icons/share-product.svg" aria-hidden="true">
                        </button>
                    </div>
                    <p v-else class="preview-right__raiting">Be first to rate this product!</p>
                    <div @click="toggleFullDescription" class="preview-right__info">
                        <p :class="rightDescriptionClasses">
                            {{ product.description }}
                        </p>
                        <button type="button" class="preview-right__info-btn">
                            {{ showMoreDescriptionText }}
                            <img class="preview-right__info-btn-image" src="@public/icons/close-basket.svg">
                        </button>
                    </div>
                    <!-- basket actions and add to favorite: -->
                    <AppViewProductActions 
                        :product="product"
                        v-model:isFavorite="isFavorite"
                    />
                    <p class="preview-right__other">SKU: <span>{{ product.SKU }}</span></p>
                    <p class="preview-right__other">Size: <span>{{ product.size.toLowerCase() }}</span></p>
                </div>
            </div>
        </section>
        <!-- tabs -->
        <AppViewProductTabs 
            :product="product"/>
    </div>
    <AppSimilarItems />
</template>

<style src="./AppViewProduct.scss" lang="scss"></style>