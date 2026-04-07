import React, { useState } from 'react'
import { Button } from './common/Button'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'

export default function Header() {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const location = useLocation()

  return (
    <nav  className='flex absolute bg-white justify-between items-center px-[5%] p-7 w-full text-xl font-semibold text-gray-500'>
      <section className=' flex items-center gap-5'>
        <img src="/Text.png" alt="SortLink" className='h-7'/>
        <Link to="/dashboard" className='hover:text-primary'>Dashboard</Link>
        <Link to="" className='hover:text-primary'>Analytics</Link>
        <Link to="" className='hover:text-primary'>Links</Link>
      </section>
      <section className='w-full flex justify-end items-center gap-5'>
        {isLogin ? (
        <>
          {
            location.pathname !== "/create-link" && <Button blue onClick={()=> navigate("/create-link")} size={"p-2 px-3"}><Plus/><p>Create New Link</p></Button>
          }
          <Link className='mr-5'>
            <img src="/User profile.png" alt="user" className='rounded-full'/>
          </Link>
          <button className="" onClick={() => {
              localStorage.removeItem("token")
              setIsLogin(false)
            }}>
            Log out
          </button>
        </>
        ) : (
          <>
            <Link to="/login" className='border-2 border-gray-500 hover:border-primary hover:text-primary  p-2 px-3 rounded-md '>Sign in</Link>
            <Link to="/register" className='border-2 border-primary p-2 px-3 rounded-md  bg-primary hover:bg-indigo-900 text-white'>Sign up</Link>
          </>
        )}
      </section>

      <section></section>
    </nav>
  )
}