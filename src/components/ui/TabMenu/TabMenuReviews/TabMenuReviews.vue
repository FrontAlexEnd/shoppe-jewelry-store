<script setup lang="ts">
import { ref, computed } from 'vue'
import type { InfoProduct } from '@ts-types/product'
import type { Review } from '@ts-types/index'

const { product, reviewsQuantity } = defineProps<{
    product: InfoProduct,
    reviewsQuantity: number | string
}>()
type StarRange = 0 | 1 | 2 | 3 | 4 | 5

const STARS_QUANTITY = [1, 2, 3, 4, 5] as const
const activeStars = ref<StarRange>(0)
const twoReviews = computed<Review[]>(() => product.reviews.slice(0, 2))

const arrayFromRaiting = (raiting: number): number[] => {
    const raitingArray = []

    while (raiting >= 1) {
        raitingArray.push(1)
        raiting = raiting - 1
    }

    while (raitingArray.length < STARS_QUANTITY.length) {
        raitingArray.push(0)
    }
    return raitingArray
}

const starClasses = (star: number) => star === 1 ? 'reviews__left-star' : 'reviews__left-star reviews__left-star--empty'
const handleStarsClasses = (idx: number) => activeStars.value >= idx ? 'reviews__form-star reviews__form-star--active' : 'reviews__form-star'
</script>

<template>
    <div class="product-tabs__tab reviews">
        <div class="reviews__left">
            <h3 class="reviews__left-title">{{ reviewsQuantity }} reviews for {{ product?.title }}</h3>
            <div v-for="review in twoReviews"
                :key="review.documentId"
                class="reviews__left-review">
                <h4 class="reviews__left-review-name">{{ review.author }}</h4>
                <div class="reviews__left-stars-inner">
                    <svg v-for="star in arrayFromRaiting(review.rate)"
                        :class="starClasses(star)" 
                        aria-hidden="true">
                        <use xlink:href="@assets/sprite.svg#star-raiting"></use>
                    </svg>
                </div>
                <p class="reviews__left-comment">{{ review.text }}</p>
            </div>
        </div>
        <div class="reviews__form">
            <h3 class="reviews__form-title">Add a Review</h3>
            <p class="reviews__form-required">Required fields are marked *</p>
            <!-- '!!' prevent stop action of submit form -->
            <form @submit.prevent class="reviews__form-wrapper" method="POST">
                <textarea class="reviews__form-textarea" placeholder="Your review*" name="review-text" id="user-review" required></textarea>
                <textarea class="reviews__form-textarea reviews__form-textarea--for-name" placeholder="Enter your name*" name="review-text" id="user-name" required></textarea>
                <input class="reviews__form-label-checkbox" type="checkbox" id="save-comment-user">
                <label class="reviews__form-label" for="save-comment-user">Save my name, and website in this browser for the next time I comment</label>
                <p class="reviews__form-raiting-text">Your rating*</p>
                <div @mouseleave="activeStars = 0" class="reviews__form-stars-inner">
                    <svg v-for="(star, idx) in STARS_QUANTITY"
                        :class="handleStarsClasses(idx + 1)" 
                        @mouseenter="activeStars = star"
                        aria-hidden="true">
                            <use xlink:href="@assets/sprite.svg#star-raiting"></use>
                    </svg>
                </div>
                <button class="reviews__form-submit-btn button" type="submit">Submit</button>
            </form>
        </div>
    </div>
</template>

<style src="./TabMenuReviews.scss" lang="scss"></style>