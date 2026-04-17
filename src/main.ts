import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { useUiStore } from '@stores/UiStore'
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import App from '@/App.vue'
import Main from '@/views/MainView.vue'

const routes = [
    { name: 'Main', path: '/', component: Main },
    { name: 'Catalog', path: '/catalog', component: () => import('@/views/CatalogView.vue') },
    { name: 'Product', path: '/product/:id', component: () => import('@/views/ProductView.vue') }
]

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes,
})

const app = createApp(App)
                .use(router)
                .use(createPinia())
                .mount('#app')

router.afterEach(() => {
    const { resetUi } = useUiStore()
    resetUi()
})