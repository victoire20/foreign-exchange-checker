import {RefObject, useEffect} from "react";

export function useClickOutside<T extends HTMLElement>(
    ref: RefObject<T | null>,
    callback: () => void
) {
    useEffect(() => {
        function listener(event: MouseEvent) {
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return
            }
            callback()
        }
        document.addEventListener('mousedown', listener)

        return () => {
            document.removeEventListener('mousedown', listener)
        }
    }, [ref, callback])
}