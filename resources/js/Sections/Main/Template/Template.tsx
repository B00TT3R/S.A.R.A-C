import { useReducer } from 'react'
import { Outlet } from 'react-router-dom'
import RootContext, {initialState, reducer} from '../Contexts/RootContext'
import Sidebar from './Sidebar/Sidebar'
import Menu from './Menu/Menu'
import { classNames } from '@/Utils';
import {MouseEventHandler} from 'react'


export default function Template() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const closeMenu: MouseEventHandler<HTMLElement> = (e) =>{
    const target =  e.target as HTMLElement
    if (!target.closest('#menu, #menu *')) {
      dispatch({ type: 'closeMenu' });
    }
  };
  
  return (
      <RootContext.Provider value={{ state, dispatch }}>
        <section className='w-screen h-screen flex flex-col' onClick={closeMenu}>
          <Sidebar/>
          <Menu/>
          <div className={classNames(
            "w-full h-full flex transition-all",
            "bg-gray-200",
            "dark:bg-gray-900",
            state.sidebar?"p-3":"p-1.5 sm:p-4"
          )}>
            <main className={classNames(
              "transition-all flex flex-col flex-1  border shadow-sm",
              "rounded p-2 sm:p-3 overflow-y-auto",
              "relative",
              "bg-white border-slate-400 shadow-gray-400 text-black",
              "dark:bg-black dark:border-slate-900 dark:shadow-black dark:text-white",
              state.sidebar?"ml-72":"ml-12"
            )}>
              <Outlet/>
            </main>
          </div>
        </section>
      </RootContext.Provider>
  )
}
