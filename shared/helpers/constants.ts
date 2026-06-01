/* icons path */
export const MENU_ICON_PATH = "/icons/menu.svg"
export const CLOSE_ICON_PATH = "/icons/close.svg"

/* keys */
export const LOCAL_STORAGE_KEY = 'products'

/* API-s */
export const API = {
    CARDS: 'https://api.dev.cwe.su/api/products/?populate=*',
    SLIDES: 'https://api.dev.cwe.su/api/promos/?populate=*',
} as const

/* timing */
export const TIMING = {
    FADING_OUT: 1000,
    LONG_FADING_OUT: 3000,
    SHOW_SCROLL: 350
} as const

/* ENUM data-actions */
export enum DataAction {
    Add = 'add-one',
    RemoveOne = 'remove-one',
    RemoveComplitely = 'remove-completely',
}

/* strings */
export const LIMIT_TEXT = 'show text with limit'