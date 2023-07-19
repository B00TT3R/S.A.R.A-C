import { createContext } from "react";

function getInitialTheme() {
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDarkMode ? "dark" : "light";
}

const initialState = {
    sidebar: false,
    menu: false,
    theme: getInitialTheme(),
};

const RootContext = createContext({} as any);

const reducer = (state: typeof initialState, action: any) => {
    switch (action.type) {
        case 'toggle':
            return {...state, sidebar: !state.sidebar}
        case 'open':
            return {...state, sidebar: true}
        case 'close':
            return {...state, sidebar: false}
        case 'openMenu':
            return {...state, menu: true}
        case 'closeMenu':
            return {...state, menu: false}
        case 'toggleMenu':
            return {...state, menu: !state.menu}
        default:
            return state;
    }
};

export { reducer, initialState };
export default RootContext;
