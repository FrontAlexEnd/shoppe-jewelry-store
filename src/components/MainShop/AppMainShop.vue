<script setup lang="ts">
import { computed } from 'vue'
import ProductCard from '@components/ProductCard/AppProductCard.vue'
import { useProductsStore } from '@stores/ProductsStore'
import type { Product } from '@ts-types/product'

/* string with class */
const cardClass = 'main-shop__grid-card'
const cardsQuantity = 6

const productsStore = useProductsStore()
const firstSixCards = computed<Product[]>(() => productsStore.allProducts.slice(0, cardsQuantity))
</script>

<template>
    <section class="main-shop">
        <div class="main-shop__title">
            <h2 class="main-shop__title-text h2">Shop The Latest</h2>
            <RouterLink class="main-shop__link link--accent" to="/catalog">
                View all
            </RouterLink>
        </div>
        <div class="main-shop__grid">
            <ProductCard 
                v-for="card in firstSixCards" 
                :key="card.documentId" 
                :cardData="card"
                :cardClass="cardClass"
            />
        </div>
    </section>
</template>

<style src="./AppMainShop.scss" lang="scss"></style>