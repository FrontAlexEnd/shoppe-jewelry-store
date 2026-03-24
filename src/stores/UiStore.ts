import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { TIMING } from '@helpers/constants'

const BASKET_OPEN_CLASS = 'open-basket'
const BODY_CLASS = 'open-modal-window'

export const useUiStore = defineStore('uiStore', () => {
    const ui = ref({
        loader: 0,
        burger: false,
        basket: false,
    })

    const isLoading = computed(() => ui.value.loader > 0)
    const isBurgerActive = computed(() => ui.value.burger)
    const isBasketActive = computed(() => ui.value.basket)

    /* -- burger -- */
    const toggleBurgerMenu = () => ui.value.burger = !ui.value.burger
    const closeBurgerMenu = () => ui.value.burger = false

    watch(isBurgerActive, (newVal) => {
        const body = document.body
        if (newVal) {
            body.classList.add(BODY_CLASS)
        } else {
            body.classList.remove(BODY_CLASS)
        }
    })

    /* -- loader -- */
    const startLoading = () => ui.value.loader += 1

    const stopLoading = () => {
        if (ui.value.loader > 0) {
            ui.value.loader -= 1
        }
    }

    /* -- basket -- */
    const toggleBasket = () => ui.value.basket = !ui.value.basket
    const closeBasket = () => ui.value.basket = false

    watch(isBasketActive, (newVal) => {
        const body = document.body
        if (newVal) {
            body.classList.add(BASKET_OPEN_CLASS)
        } else {
            setTimeout(() => {
                body.classList.remove(BASKET_OPEN_CLASS) /* for smooth animation */
            }, TIMING.SHOW_SCROLL)
        }
    })

    /*-- close basket and burger --*/
    const resetUi = () => {
        closeBurgerMenu()
        closeBasket()
    }

    return {
        isBurgerActive,
        toggleBurgerMenu,
        closeBurgerMenu,
        isLoading,
        startLoading,
        stopLoading,
        isBasketActive,
        toggleBasket,
        resetUi
    }
})