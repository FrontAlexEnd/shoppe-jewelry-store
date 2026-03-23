<script setup lang="ts">
import { computed, watch, shallowRef } from 'vue'
import { useWindowSize } from '@vueuse/core'
import type { Component } from 'vue'
import type { InfoProduct } from '@ts-types/product'
import type { ProductTab } from '@ts-types/index'
/* tabs */
import TabMenuDescription from '@components/ui/TabMenu/TabMenuDescription/TabMenuDescription.vue'
import TabMenuAditional from '@components/ui/TabMenu/TabMenuAditional/TabMenuAditional.vue'
import TabMenuReviews from '@components/ui/TabMenu/TabMenuReviews/TabMenuReviews.vue'

const { product } = defineProps<{
    product: InfoProduct
}>()

const MOBILE_WIDTH = 768
const screenSize = useWindowSize()
const isMobileWidth = computed(() => screenSize.width.value < MOBILE_WIDTH ? true : false)
const reviewsQuantity = computed<number>(() => product.reviews.length)

const activeTab = shallowRef<Component | null>(isMobileWidth.value ? null : TabMenuDescription)

watch(isMobileWidth, (newVal) => {
    newVal ? activeTab.value = null : activeTab.value = TabMenuDescription
})

const tabs = shallowRef<ProductTab[]>([ 
    {
        tabLabel: 'Description',
        component: TabMenuDescription,
        id: 'description',
    }, 
    {
        tabLabel: 'Additional information',
        component: TabMenuAditional,
        id: 'aditional',
    },
    {
        tabLabel: `Reviews (${reviewsQuantity.value})`,
        component: TabMenuReviews,
        id: 'reviews',
    }
])

const handleShowTab = (event: Event) => {
    const target = event.target as HTMLElement
    const action = target.dataset.action
    if (!action) return

    const targetTab = tabs.value.find(t => t.id === action)
    if (!targetTab) return

    if (!isMobileWidth.value) {
        activeTab.value = targetTab.component
    } else {
        const isSame = activeTab.value === targetTab.component
        activeTab.value = isSame ? null : activeTab.value = targetTab.component
    }
}

const isTabActive = (tabComponent: Component) => activeTab.value == tabComponent

const defineButtonClasses = (tabComponent: Component) => {
    return {
        'product-tabs__buttons-btn': true,
        'product-tabs__buttons-btn--active': isTabActive(tabComponent) 
    }
}

const defineArrowClasses = (tabComponent: Component) => {
    return {
        'product-tabs__buttons-btn-arrow' : true,
        'product-tabs__buttons-btn-arrow--active': isTabActive(tabComponent)
    }
}
</script>

<template>
    <!-- desktop tabs -->
    <section v-if="!isMobileWidth" class="product-tabs">
        <div @click="handleShowTab($event)" class="product-tabs__buttons">
            <button 
                v-for="tab in tabs"
                :key="tab.id"
                :data-action="tab.id"
                :class="defineButtonClasses(tab.component)">
                    {{ tab.tabLabel }}
                <img class="product-tabs__buttons-btn-arrow" src="@public/icons/close-basket.svg">
            </button>
        </div>
        <!-- dinamic component -->
        <KeepAlive>
            <component
                :is="activeTab"
                :product="product"
                :reviewsQuantity="reviewsQuantity"
            />
        </KeepAlive>
    </section>
    <!-- mobile tabs -->
    <section v-else class="product-tabs">
        <div @click="handleShowTab($event)" class="product-tabs__buttons">
            <div v-for="tab in tabs" 
                :key="tab.id"
                class="product-tabs__buttons-wrapper">
                <button :data-action="tab.id" 
                    class="product-tabs__buttons-btn">
                        {{ tab.tabLabel }}
                    <img :class="defineArrowClasses(tab.component)" src="@public/icons/close-basket.svg">
                </button>
                <Transition name="accordion">
                    <!-- dinamic component -->
                    <KeepAlive>
                        <component v-if="isTabActive(tab.component)"
                            :is="tab.component"
                            :product="product"
                            :reviewsQuantity="reviewsQuantity"
                        />
                    </KeepAlive>
                </Transition>
            </div>
        </div>
    </section>
</template>

<style src="./AppViewProductTabs.scss" lang="scss"></style>