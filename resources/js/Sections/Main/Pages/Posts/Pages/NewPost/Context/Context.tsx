import {createContext, useReducer, ReactNode} from 'react'


interface Action{
  type:string
  payload:string
}

interface ContextProps {
  state: typeof initialState;
  dispatch: (action: Action) => void;
}
export const Context = createContext({} as ContextProps)
export const initialState = {
    titlePrompt:"",
    titleResult:"",
    imagePrompt:"",
    imageResult:"",
}

export function reducer(state: any, action: any) {
    switch (action.type) {
      case 'setTitlePrompt':
        return { ...state, titlePrompt: action.payload };
      case 'setTitleResult':
        return { ...state, titleResult: action.payload };
      case 'setImagePrompt':
        return { ...state, imagePrompt: action.payload };
      case 'setImageResult':
        return { ...state, imageResult: action.payload };
      default:
        return state;
    }
}

export function NewPostContextProvider({children}:{children: ReactNode}) {
    const [state, dispatch] = useReducer(reducer, initialState);  
    return (
      <Context.Provider value={{ state, dispatch }}>
        {children}
      </Context.Provider>
    );
  }