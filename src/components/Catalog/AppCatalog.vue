<script setup lang="ts">
import { ref, computed } from 'vue'
import { useProductsStore } from '@stores/ProductsStore'
import { storeToRefs } from 'pinia'
import AppFilters from '@components/CatalogFilters/AppCatalogFilters.vue'
import ProductCard from '@components/ProductCard/AppProductCard.vue'
import AppCatalogPagination from '@components/CatalogPagination/AppCatalogPagination.vue'
import type { Product } from '@ts-types/product'

/* string with class */
const cardClass = 'catalog__body-grid-card'
const { allProducts } = storeToRefs(useProductsStore())

/* pagination */
const currentPage = ref(1)
const cardsPerPage = 6

const totalPages = computed(() => Math.ceil(allProducts.value.length / cardsPerPage))

/* cards by page */
const cardsArrayByPage = computed<Product[]>(() => {
    return allProducts.value.slice((currentPage.value - 1) * cardsPerPage, currentPage.value * cardsPerPage)
})

/* filters */
const isFiltersOpen = ref(false)
const handleToggleFilters = () => isFiltersOpen.value = !isFiltersOpen.value

const formClasses = computed(() => {
    return isFiltersOpen.value ? 'catalog__body-filters catalog__body-filters--open' : 'catalog__body-filters'
})
</script>

<template>
    <section class="catalog">
        <div class="catalog__title">
            <h2 class="h2">Shop the latest</h2>
            <button @click="handleToggleFilters" class="catalog__title-filters-btn" type="button">
                <img src="@assets/sprite/filter.svg" alt="Filters button" width="18" height="18" loading="lazy" />
                Filters
            </button>
        </div>
        <div class="catalog__body">
            <AppFilters 
                :class="formClasses" 
                v-model="isFiltersOpen"
            />
            <div class="catalog__body-wrapper">
                <div class="catalog__body-grid">
                    <ProductCard 
                        v-for="card in cardsArrayByPage"
                        :key="card.documentId"
                        :cardData="card"
                        :cardClass="cardClass"
                    />
                </div>
                <AppCatalogPagination 
                    :totalPages="totalPages"
                    v-model="currentPage"
                />
            </div>
        </div>
    </section>
</template>

<style src="./AppCatalog.scss" lang="scss"></style>