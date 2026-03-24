import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { getApiCards } from '@helpers/fetchApi'
import { API } from '@helpers/constants'
import type { Slide } from '@ts-types/index'

export const useSliderStore = defineStore('sliderStore', () => {
    const slides = ref<Slide[]>([])

    onMounted(async () => {
        try {
            const data = await getApiCards<{ data: Slide[] }>(API.SLIDES)
            slides.value = data.data
        } catch (e) {
            console.error('Failed to get API slides', e)
        }
    })

    return {
        slides
    }
})