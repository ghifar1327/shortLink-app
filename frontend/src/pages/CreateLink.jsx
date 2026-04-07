import { AiOutlineEye } from "react-icons/ai"; 
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
import Input from '../components/common/Input'
import { Button } from "../components/common/Button";

export default function CreateLink() {
  return (
        <main className='p-[5%] mt-[3%] px-[25%] flex-1 bg-[#F3F4F5] flex flex-col gap-5'>
          <Link to="/dashboard" className='text-primary flex gap-3 text-2xl items-center'><ArrowLeft/> Back to Dashboard</Link>    
          <h1 className='text-4xl font-bold'>Created New Short Link</h1>
          <p className='text-gray-700'>Transform your long URLs into clean, manageable assets.</p>
          <section className='bg-white p-10 rounded-2xl flex flex-col gap-5'>
            <div>
             <Input placeholder="https://example.com/your-long-url-here" gray>Destination URL <span className='text-red-500'>*</span></Input>
             <p className='text-gray-400 text-sm mt-2'><i>Ensure your URL starts with http:// or https://</i></p>
            </div>
            <div>
                <label htmlFor="">Custom Slug (Optional)</label>
                <div className='flex items-center border rounded-l border-gray-300 mt-2'>
                 <p className='bg-gray-300 p-2 rounded-l '>short.link/</p>
                 <input placeholder="my-custom-slug" className='flex-1 outline-none p-2 px-3'/>
                </div>
             <p className='text-gray-400 text-sm mt-2'><i>Leave blank to generate a random unique identifier.</i></p>
            </div>
            <div className="flex flex-col p-5 text-primary bg-[#B4C5FF80]/50 rounded-xl border border-primary">
                <p className="flex items-center gap-3"><AiOutlineEye /> Live Preview</p>
                <p className="pl-6"><span className="text-black">Your short link will be:</span> https://short.link/my-custom-slug</p>
            </div>
            <div className=" flex items-center gap-2 mt-4">
                <Button size="p-2 px-3" blue>Create Link</Button>
                <Button size="p-2 px-3">Cancel</Button>
            </div>
          </section>
        </main>
  )
}
