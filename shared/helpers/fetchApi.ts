import { useUiStore } from '@stores/UiStore'

export async function getApiCards<T>(API: string): Promise<T> { 
    const uiStore = useUiStore()
    uiStore.startLoading()
    
    try {
        const response = await fetch(API)
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`)
        }

        return await response.json() as T
    } finally {
        uiStore.stopLoading()
    }
}

