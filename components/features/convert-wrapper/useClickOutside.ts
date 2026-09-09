import {RefObject, useEffect} from "react"

export function useClickOutside<T extends HTMLElement>(
    ref: RefObject<T | null>,
    callback: () => void
) {
    useEffect(() => {
        function handleOutsideClick(event: MouseEvent) {
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return
            }
            callback()
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                callback()
            }
        }

        document.addEventListener('mousedown', handleOutsideClick)
        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
            document.removeEventListener('keydown', handleKeyDown)
        };
    }, [ref, callback])
}