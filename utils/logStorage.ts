interface Log {
    time: string;
    pair: [string, string];
    value: string;
    convertor: string;
}

const STORAGE_KEY = "currencies_logs";

export const logStorage = {
    /**
     * Récupère les logs du navigateur et les reconvertit en tableau d'objets Log[]
     */
    getLogs: (): Log[] => {
        if (typeof window === 'undefined') return [];

        const rawData = localStorage.getItem(STORAGE_KEY)
        if (!rawData) return []

        try {
            return JSON.parse(rawData) as Log[]
        } catch (error) {
            console.error("Erreur de lecture des logs :", error)
            return []
        }
    },

    /**
     * Formate le tableau Log[] en string et le sauvegarde dans le navigateur
     */
    saveLogs: (logs: Log[]): void => {
        if (typeof window === 'undefined') return

        const stringData = JSON.stringify(logs)
        localStorage.setItem(STORAGE_KEY, stringData)
    },

    /**
     * Ajoute directement un nouveau log à la liste existante
     */
    addLog: (newLog: Log): void => {
        const currentLogs = logStorage.getLogs()

        const updatedLogs = [...currentLogs, newLog]

        logStorage.saveLogs(updatedLogs)
    },

    /**
     * Retirer un log à la liste
     */
    deleteLog: (index: number): void => {
        const currentLogs = logStorage.getLogs()

        const updatedLogs = [...currentLogs.filter((item, i) => i !== index)]
        logStorage.saveLogs(updatedLogs)
    },

    /**
     * Supprime uniquement la clé des logs du localStorage
     */
    clearLogsOnly: (): void => {
        if (typeof window === 'undefined') return

        localStorage.removeItem(STORAGE_KEY)

        window.dispatchEvent(new Event("local-storage-update"))
    }
}