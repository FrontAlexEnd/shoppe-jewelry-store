<script setup lang="ts">
import { useSliderStore } from '@stores/SliderStore'
/* imports for swiper.vue */
import { Pagination, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const SWIPE_SLIDES_MS = 5000
const SLIDES_SPACE_BETWEEN = 20
const MAX_WIDTH = 767

const onSwiper = () => {}
const onSlideChange = () => {}
const modules = [Pagination, Autoplay]

const sliderStore = useSliderStore()
</script>

<template>
  <Swiper
    :modules= "modules"
    :space-between="SLIDES_SPACE_BETWEEN"
    :autoplay="{
        delay: SWIPE_SLIDES_MS,
        disableOnInteraction: false
    }"
    :pagination="{ clickable: true }"
    :loop="true"
    @swiper="onSwiper"
    @slideChange="onSlideChange">
    <SwiperSlide 
        v-for="slide in sliderStore.slides" 
        :key="slide.id">
        <div class="swiper-slide hero__inner">
            <picture class="hero__picture"> 
                <source 
                    :media="`(max-width: ${MAX_WIDTH}px)`"
                    :srcset="slide.mobileImage"
                />
                <img class="hero__img" alt="Jewelry"
                    :src="slide.desktopImage" 
                />
            </picture>
            <div class="hero__body">
                <h2 class="h2 hero__body-title">{{ slide.product.title }}</h2>
                <p class="hero__body-pricing">$ {{slide.product.price}},00</p>
                <RouterLink 
                    :to="{ name: 'Product', params: { id: slide.product.documentId }}" 
                    class="hero__body-button button">
                    View product
                </RouterLink>
            </div>
        </div>
    </SwiperSlide>
  </Swiper>
</template>

<style src="./AppSlider.scss" lang="scss"></style>