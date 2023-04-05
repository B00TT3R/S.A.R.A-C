import React, { useContext, useReducer } from 'react';
import RootContext from './Contexts/RootContext';
const initialState = {
    sidebar: false
}

const reducer = (state:any, action:any) => {
    switch (action.type) {
        case 'toggle':
            return {...state, sidebar:!state.sidebar}
        case 'open':
            return {...state, sidebar: true}
        case 'close':
            return {...state, sidebar: false}
    }
}
const Main = () => {
    
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <RootContext.Provider value={{ state, dispatch }}>
            teste
        </RootContext.Provider>
    )
}
export default Main