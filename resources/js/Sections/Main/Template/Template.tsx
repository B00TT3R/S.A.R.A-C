import { useReducer } from 'react'
import { Outlet } from 'react-router-dom'
import RootContext, {initialState, reducer} from '../Contexts/RootContext'
import Sidebar from './Sidebar/Sidebar'


export default function Template() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <> 
      <RootContext.Provider value={{ state, dispatch }}>
        <Sidebar/>
        <Outlet/>
      </RootContext.Provider>
    </>
  )
}
