import { AiOutlineEye } from "react-icons/ai"; 
import { ArrowLeft } from 'lucide-react'
import React, { useContext } from 'react'
import { Link } from 'react-router'
import Input from '../components/common/Input'
import { Button } from "../components/common/Button";
import LinkContext from "../context/LinkContex";

export default function CreateLink() {
  const [form, setForm] = React.useState({
    original_url: "",
    slug: "",
  }); 
  const {createLink} = useContext(LinkContext);
  const handleChange = (e) => {
    const { name, value } = e.target; 
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));

  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createLink(form);
  }   
  return (
        <main className='p-[5%] mt-[3%] px-[25%] flex-1 bg-[#F3F4F5] flex flex-col gap-5'>
          <Link to="/dashboard" className='text-primary flex gap-3 text-2xl items-center'><ArrowLeft/> Back to Dashboard</Link>    
          <h1 className='text-4xl font-bold'>Created New Short Link</h1>
          <p className='text-gray-700'>Transform your long URLs into clean, manageable assets.</p>
          <form onSubmit={handleSubmit} className='bg-white p-10 rounded-2xl flex flex-col gap-5'>
            <div>
             <Input id={"original_url"} name="original_url" onChange={handleChange} placeholder="https://example.com/your-long-url-here" gray>Destination URL <span className='text-red-500'>*</span></Input>
             <p className='text-gray-400 text-sm mt-2'><i>Ensure your URL starts with http:// or https://</i></p>
            </div>
            <div>
                <label htmlFor="slug">Custom Slug (Optional)</label>
                <div className='flex items-center border rounded-l border-gray-300 mt-2'>
                 <p className='bg-gray-300 p-2 rounded-l '>short.link/</p>
                 <input id="slug" name="slug" onChange={handleChange}  placeholder="my-custom-slug" className='flex-1 outline-none p-2 px-3'/>
                </div>
             <p className='text-gray-400 text-sm mt-2'><i>Leave blank to generate a random unique identifier.</i></p>
            </div>
            <div className="flex flex-col p-5 text-primary bg-[#B4C5FF80]/50 rounded-xl border border-primary">
                <p className="flex items-center gap-3"><AiOutlineEye /> Live Preview</p>
                <p className="pl-6"><span className="text-black">Your short link will be: </span>{form.slug ? `https://short.link/${form.slug}` : 'https://short.link/your-custom-slug'}</p>
            </div>
            <div className=" flex items-center gap-2 mt-4">
                <Button type="submit" size="p-2 px-3" blue>Create Link</Button>
                <Button type="reset" size="p-2 px-3">Cancel</Button>
            </div>
          </form>
        </main>
  )
}
