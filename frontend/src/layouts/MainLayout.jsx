import React from 'react'
import { Outlet } from 'react-router'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function MainLayout() {
  return (
    <><div className='min-h-screen flex flex-col justify-between'>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
    </>
  )
}
