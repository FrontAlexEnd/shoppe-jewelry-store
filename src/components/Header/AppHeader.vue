<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { MENU_ICON_PATH, CLOSE_ICON_PATH } from '@helpers/constants'
import { useBasketStore } from '@stores/BasketStore'
import { useRoute } from 'vue-router'
import { useUiStore } from '@stores/UiStore'
import { storeToRefs } from 'pinia'

const route = useRoute()
const classModifiers = ref(false)
const catalogStr = 'Catalog'
const productStr = 'Product'
const uiStore = useUiStore()
const { calcTotalQuantity } = storeToRefs(useBasketStore())

/* check routes for modifiers classes */
watch(() => route.name, (newName) => {
    if (newName == catalogStr || newName == productStr) {
        classModifiers.value = true
    } else {
        classModifiers.value = false
    }
})

/* ui store */
const { isBurgerActive } = storeToRefs(uiStore)
const { toggleBurgerMenu, closeBurgerMenu, toggleBasket } = uiStore

/* computeds for classes and text */
const headerClasses = computed(() => {
    return classModifiers.value ? 'header header--catalog' : 'header'
})
const headerInnerClasses = computed(() => {
    return classModifiers.value ? 'header__inner header__inner--with-border' : 'header__inner'
})
const linkClasses = computed(() => {
    return classModifiers.value ? 'header__menu-link hidden-mobile header__menu-link--active' : 'header__menu-link hidden-mobile'
})
const burgerMenuClasses = computed(() => {
    return isBurgerActive.value ? 'header__burger-menu burger-menu burger-menu--active' : 'header__burger-menu burger-menu'
})
</script>

<template>
    <header :class="headerClasses">
        <div :class="headerInnerClasses">
            <RouterLink class="header__logo logo" to="/">
                <img class="logo__image" src="/favicon/logo.svg" alt="Shoppe store logo" width="135" height="40" />
            </RouterLink >
            <div class="header__right">
                <nav class="header__menu">
                    <ul class="header__menu-list">
                        <li class="header__menu-item">
                            <RouterLink
                                :class="linkClasses" 
                                to="/catalog">
                                Shop
                            </RouterLink>
                        </li>
                    </ul>
                </nav>
                <div class="header__actions">
                    <button @click="toggleBasket" class="header__actions-basket button-icon" type="button"
                        title="Show cart">
                        <img src="@public/icons/basket.svg" alt="Basket button" width="20" height="20" />
                        <span class="visually-hidden">Show cart</span>
                        <span class="header__actions-basket-counter">{{ calcTotalQuantity }}</span>
                    </button>
                    <button class="header__actions-profile button-icon hidden-mobile" type="button" title="Profile">
                        <img src="@public/icons/profile.svg" alt="Profile button" width="20" height="20" />
                        <span class="visually-hidden">Show profile</span>
                    </button>
                    <button class="header__actions-burger-menu button-icon visible-mobile" @click="toggleBurgerMenu"
                        type="button" title="Menu">
                        <img :src="isBurgerActive ? CLOSE_ICON_PATH : MENU_ICON_PATH" alt="Menu button" width="20"
                            height="20" />
                        <span class="visually-hidden">Menu</span>
                    </button>
                </div>
            </div>
        </div>
        <nav :class="burgerMenuClasses">
            <div class="burger-menu__top">
                <RouterLink class="burger-menu__link" to="/">Home</RouterLink>
                <RouterLink class="burger-menu__link" to="/catalog">Shop</RouterLink>
            </div>
            <a @click="closeBurgerMenu" class="burger-menu__link" href="#">
                <img src="@public/icons/profile.svg" width="20" height="20" alt="Profile icon">
                <span>My account</span>
            </a>
            <a @click="closeBurgerMenu" class="burger-menu__link" href="#">
                <img src="@public/icons/logout.svg" width="18" height="18" alt="Logout icon">
                <span>Logout</span>
            </a>
        </nav>
    </header>
</template>

<style src="./AppHeader.scss" lang="scss"></style>