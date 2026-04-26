// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 3,
  },
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt'
  ],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
