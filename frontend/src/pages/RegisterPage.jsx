import React from 'react'
import Input from '../components/common/Input'
import { Link } from 'react-router'
import { Button } from '../components/common/Button'
import { ArrowRight } from 'lucide-react'
import { AiOutlineGoogle } from 'react-icons/ai'

export default function RegisterPage() {
  return (
    <>
     <div className='text-center flex flex-col gap-3'>
       <h1 className="text-3xl font-semibold">Cteate Account</h1>
       <p className="text-gray-500">Join the elite architects of the web.</p>
     </div>
     <section className="border border-gray-300 shadow-2xl w-[20%] flex flex-col gap-5 p-5 py-10 rounded bg-white">
       <Input >Email</Input>
       <Input password >Password</Input>
       <Input>Comfirm Password</Input>       
      <Button blue>Sign Up <ArrowRight></ArrowRight></Button>
      <p className='text-xs text-center'>By signing up, you agree to our Terms of Service and By signing up, you agree to our Terms of Service and Police</p>
     </section>
     <p>Already have an account? <Link className="text-primary">Log in</Link></p>
   </>
  )
}
