<script setup lang="ts">

const model = defineModel<boolean>({ required: true })
const closeFilters = () => model.value = false
</script>

<template>
    <form >
        <label for="search" class="visually-hidden">Search input
        </label>
        <div class="catalog__body-filters-input">
            <input class="input" id="search" name="search" type="search" placeholder="Search..." />
            <img class="catalog__body-filters-input-search" src="@assets/sprite/search.svg" alt="Search" width="20"
                height="20" />
        </div>
        <label for="sortby" class="visually-hidden">Sort by</label>
        <select id="sortby" class="catalog__body-filters-select select" name="sort">
            <option value="" selected>Sort By</option>
            <option value="price">Price</option>
            <option value="name">Name</option>
        </select>
        <div class="wrapper-radio-btn">
            <label for="onsale" class="wrapper-radio-btn__title">On sale</label>
            <div class="wrapper-radio-btn__switch">
                <input id="onsale" class="wrapper-radio-btn__input" type="checkbox" name="onSale">
                <span class="wrapper-radio-btn__slider"></span>
            </div>
        </div>
        <div class="wrapper-radio-btn">
            <label for="instock" class="wrapper-radio-btn__title">In stock</label>
            <div class="wrapper-radio-btn__switch">
                <input id="instock" class="wrapper-radio-btn__input" type="checkbox" name="inStock">
                <span class="wrapper-radio-btn__slider"></span>
            </div>
        </div>
        <div class="wrapper-buttons visible-mobile">
            <button @click="" class="button button--black-borders">APPLY FILTERS</button>
            <button @click="" class="button button--black-borders">RESET FILTERS</button>
            <button @click="closeFilters" 
                type="button" class="button button--black-borders">
                CLOSE FILTERS
            </button>
        </div>
    </form>
</template>

<style src="./AppCatalogFilters.scss" lang="scss"></style>