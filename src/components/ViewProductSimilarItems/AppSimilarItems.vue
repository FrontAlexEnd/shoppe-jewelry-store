<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getApiCards } from '@helpers/fetchApi'
import AppProductCard from '@components/ProductCard/AppProductCard.vue'
import type { Product } from '@ts-types/product'

const API_SIMILAR_ITEMS = 'https://api.dev.cwe.su/api/products/?pagination[pageSize]=3'
const similarItems = ref<Product[] | null>(null)
const cardClass = 'similar-items__grid-card'

onMounted(async() => {
    try {
        const data = await getApiCards<{ data: Product[]}>(API_SIMILAR_ITEMS)
        similarItems.value = data.data
    } catch(e) {
        console.error('Failed to get API similar items:', e)
    }
})
</script>

<template>
    <section class="similar-items" v-if="similarItems">
        <div class="similar-items__grid">
            <AppProductCard 
                v-for="product in similarItems"
                :cardClass="cardClass"
                :cardData="product"
            />
        </div>
        <RouterLink to="/catalog" class="similar-items__link-to-catalog">
            <span class="similar-items__link-to-catalog-text">Continue shopping</span>
            <img class="similar-items__link-to-catalog-arrow" src="@public/icons/close-basket.svg">
        </RouterLink>
    </section>
</template>

<style src="./AppSimilarItems.scss" lang="scss"></style>