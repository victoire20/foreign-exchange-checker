interface FavoritePair {
    base: string;
    quote: string;
}

const STORAGE_KEY = 'favorite_pair'

export const favoritePairStorage = {
    /**
     * Récupère les logs du navigateur et les reconvertit en tableau d'objets FavoritePair[]
     */
    getFavoritePair: (): FavoritePair[] => {
        if (typeof window === 'undefined') return [];

        const rawData = localStorage.getItem(STORAGE_KEY)
        if (!rawData) return []

        try {
            return JSON.parse(rawData) as FavoritePair[]
        } catch (error) {
            console.error("Erreur de lecture des pair favorite :", error)
            return []
        }
    },

    /**
     * Formate le tableau FavoritePair[] en string et le sauvegarde dans le navigateur
     */
    saveFavoritePair: (pairs: FavoritePair[]): void => {
        if (typeof window === 'undefined') return

        const stringData = JSON.stringify(pairs)
        localStorage.setItem(STORAGE_KEY, stringData)
    },

    /**
     * Ajoute directement un nouveau pair favori à la liste existante
     */
    addFavoritePair: (newPair: FavoritePair): void => {
        const currentPair = favoritePairStorage.getFavoritePair()

        const alreadyExists = currentPair.some(
            item => item.base === newPair.base && item.quote === newPair.quote
        )

        if (!alreadyExists) {
            const updatedPair = [...currentPair, newPair];
            favoritePairStorage.saveFavoritePair(updatedPair);

            window.dispatchEvent(new Event("local-storage-update"));
        }
    },

    /**
     * Retirer un pair favori à la liste
     */
    deleteFavoritePair: (index: number): void => {
        const currentPair = favoritePairStorage.getFavoritePair()

        const updatedPair = [...currentPair.filter((item, i) => i !== index)]
        favoritePairStorage.saveFavoritePair(updatedPair)
        window.dispatchEvent(new Event("local-storage-update"));
    },

    /**
     * Retirer un pair favori par base/quote
     */
    deleteFavoritePairByCode: (base: string, quote: string): void => {
        const currentPair = favoritePairStorage.getFavoritePair()
        
        const index = currentPair.findIndex(
            item => item.base.toUpperCase() === base.toUpperCase() && 
                    item.quote.toUpperCase() === quote.toUpperCase()
        )

        if (index !== -1) {
            favoritePairStorage.deleteFavoritePair(index)
        }
    }
}