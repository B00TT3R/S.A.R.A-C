import {createContext, useReducer, ReactNode} from 'react'


interface Action{
  type:string
  payload:any
}

interface ContextProps {
  state: typeof initialState;
  dispatch: (action: Action) => void;
}
export const Context = createContext({} as ContextProps)
export const initialState = {
    textPrompt:"",
    textResult:"",
    imagePrompt:"",
    imageResult:"",
    imageLoading:false,
    textLoading:false,
}

export const reducer = (state: typeof initialState, action: Action): any => {
  const { type, payload } = action;
  const stateUpdates = {
    setTextPrompt: { ...state, textPrompt: payload },
    setTextResult: { ...state, textResult: payload },
    setTextLoading: { ...state, textLoading: payload },
    setImagePrompt: { ...state, imagePrompt: payload },
    setImageResult: { ...state, imageResult: payload },
    setImageLoading: { ...state, imageLoading: payload },
    
  } as {[key:string]:typeof initialState};
  return stateUpdates[type] || state;
};

export function NewPostContextProvider({children}:{children: ReactNode}) {
    const [state, dispatch] = useReducer(reducer, initialState);  
    return (
      <Context.Provider value={{ state, dispatch }}>
        {children}
      </Context.Provider>
    );
  }