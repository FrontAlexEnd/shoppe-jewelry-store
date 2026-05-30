export async function apiUpdateFavoriteStatus(productId: string, isFavorite: boolean): Promise<boolean> {
    let status = true

    try {
        const response = await fetch(`https://api.dev.cwe.su/api/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'data': { 'isFavorite': !isFavorite } })
        })

        if (!response.ok) {
            throw new Error('Failed to fetch api update favorite status')
        }
    } catch (error) {
        console.error(error);
        status = false
    } finally {
        return status
    }
}


