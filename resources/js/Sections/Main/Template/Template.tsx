import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Template() {
  return (
    <> 
        <div>
            template
        </div>
        <Outlet/>
    </>
  )
}
