export default defineNuxtConfig({
  /* настройка использования папок и файлов: */
  components: [
    {
      path: '~/shared/components',
      prefix: 'Shared'
    },
    '~/components'
  ],

  /* автоимпорты: */
  imports: {
    /* директории с логикой .ts */
    dirs: [
      './shared/helpers/**', /* ** - отслеживать папку на любую глубину */
      './shared/composables/**',
      './shared/stores/**',
    ]
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/shared/assets/styles/global/_constants.scss" as *;
            @use "~/shared/assets/styles/global/_mixins.scss" as *;
          `
        }
      }
    },
    /* постоянное отслеживание изменений и обновление */
    server: {
      watch: {
        usePolling: true,
        interval: 100
      }
    }
  },

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
