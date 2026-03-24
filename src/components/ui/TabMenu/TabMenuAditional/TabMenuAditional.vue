<script setup lang="ts">
import type { InfoProduct } from '@ts-types/product';

const { product } = defineProps<{
    product: InfoProduct
}>()

</script>

<template>
    <div class="product-tabs__tab">
        <ul class="product-tabs__aditional-list">
            <li class="product-tabs__aditional-list-item">Weight:
                <span>{{ product.weight }} kg</span>
            </li>
            <li class="product-tabs__aditional-list-item">Dimensions:
                <span>{{ product.dimensions }}</span>
            </li>
            <li class="product-tabs__aditional-list-item">Color:
                <span>{{ product.color }}</span>
            </li>
            <li class="product-tabs__aditional-list-item">Material:
                <span>{{ product.material }}</span>
            </li>
        </ul>
    </div>
</template>

<style src="./TabMenuAditional.scss" lang="scss"></style>