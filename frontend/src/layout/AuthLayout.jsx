import React from 'react'
import { Children } from 'react'
import { Outlet } from 'react-router'

export default function AuthLayout() {
  return (
    <main className='min-h-screen flex flex-col gap-5 justify-center items-center'>
        <Outlet></Outlet>
    </main>
  )
}
