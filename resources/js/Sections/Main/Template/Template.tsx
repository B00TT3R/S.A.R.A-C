import React, { useReducer } from 'react'
import { Outlet } from 'react-router-dom'
import RootContext from '../Contexts/RootContext'
import Sidebar from './Sidebar/Sidebar'

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
