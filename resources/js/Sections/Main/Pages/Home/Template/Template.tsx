import { useReducer } from 'react'
import { Outlet } from 'react-router-dom'
import RootContext, {initialState, reducer} from '../Contexts/RootContext'
import Sidebar from './Sidebar/Sidebar'
import { classNames } from '@/Utils';


export default function Template() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
      <RootContext.Provider value={{ state, dispatch }}>
        <section className='w-screen h-screen flex flex-col'>
          <Sidebar/>
          <div className={classNames(
            "w-full h-full flex bg-gray-200 transition-all",
            state.sidebar?"p-3":"p-1.5 sm:p-4"
          )}>
            <main className={classNames(
              "transition-all flex flex-col flex-1 border-slate-400 border-2 shadow-sm",
              "shadow-gray-400 rounded p-2 sm:p-3 overflow-y-auto",
              "bg-white relative",
              state.sidebar?"ml-72":"ml-12"
            )}>
              <Outlet/>
            </main>
          </div>
        </section>
      </RootContext.Provider>
  )
}
