<script setup lang="ts">
import { useUiStore } from '@stores/UiStore'
import { storeToRefs } from 'pinia'
import AppHeader from '@components/Header/AppHeader.vue'
import AppFooter from '@components/Footer/AppFooter.vue'
import AppBasket from '@components/Basket/AppBasket.vue'
import Loader from '@components/ui/Loader/AppLoader.vue'

const { isLoading } = storeToRefs(useUiStore())
</script>

<template>
    <main>
        <AppHeader />
        <Loader v-if="isLoading" />
        <div v-show="!isLoading">
            <router-view :key="$route.fullPath" />
        </div>
        <AppBasket />
        <AppFooter />
    </main>
</template>