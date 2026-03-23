<script setup lang="ts">
import type { InfoProduct } from '@ts-types/product'

const { product } = defineProps<{
    product: InfoProduct
}>()
</script>

<template>
    <div class="product-tabs__tab">
        <p class="product-tabs__description-text">
            {{ product.description }}
        </p>
    </div>
</template>

<style src="./TabMenuDescription.scss" lang="scss"></style>