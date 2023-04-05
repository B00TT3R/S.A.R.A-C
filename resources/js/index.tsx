import {useReducer} from 'react'
import Teste from './Components/Teste'
import RootContext from './Context/RootContext'

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
            <Teste/>
        </RootContext.Provider>
    )
}
export default Main;