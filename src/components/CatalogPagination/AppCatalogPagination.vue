<script setup lang="ts">
import { computed } from 'vue'
const { totalPages } = defineProps<{
    totalPages: number
}>()
/* current page model */
const model = defineModel<number>({ required: true })

const changeCurrentPage = (pageNumber: number) => model.value = pageNumber
const prevPage = () => model.value = model.value - 1 
const nextPage = () => model.value = model.value + 1

const threeAvailableButtons = computed<number[]>(() => {
    const current = model.value
    let start = current - 1
    let end = current + 1

    if (start < 1) {
        start = 1
        end = Math.min(3, totalPages)
    } else if (end > totalPages) {
        end = totalPages
        start = Math.max(1, totalPages - 2)
    }

    const pages = []
    for (let i = start; i <= end; i++) {
        pages.push(i)
    }
    return pages
})

/* attributes and classes */
const isPrevDisabled = computed(() => model.value === 1)
const isNextDisabled = computed(() => model.value === totalPages)
const buttonClasses = computed(() => (pageNumber: number) => {
    return pageNumber === model.value ? 'catalog__body-footer-button button button--pagination button--pagination-accent button--pagination-number' : 'catalog__body-footer-button button button--pagination button--pagination-number'
})
</script>

<template>
    <div class="catalog__body-footer">
        <button
            @click="prevPage"
            :disabled="isPrevDisabled" 
            class="catalog__body-footer-button button button--pagination" type="button">
            Prev
        </button>
        <button 
            v-for="page in threeAvailableButtons"
            :class="buttonClasses(page)"
            @click="changeCurrentPage(page)"
            type="button">
                {{page}}
        </button>
        <button 
            @click="nextPage"
            :disabled="isNextDisabled"
            class="catalog__body-footer-button button button--pagination" type="button">
                Next
        </button>
    </div>
</template>

<style src="./AppCatalogPagination.scss" lang="scss"></style>