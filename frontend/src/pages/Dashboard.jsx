import { MdOutlineContentCopy } from "react-icons/md"; 
import { FaRegTrashAlt } from "react-icons/fa"; 
import { BsBarChartFill } from "react-icons/bs"; 
import { BiCalendar } from "react-icons/bi"; 
import { BsLink } from "react-icons/bs"; 
import { BsFilter } from "react-icons/bs"; 
import { AiOutlineSearch } from "react-icons/ai"; 
import React, { useContext } from 'react'
import Input from '../components/common/Input'
import LinkContext from "../context/LinkContex";

export default function Dashboard() {
  const{fetchLinks, links } = useContext(LinkContext); 
  React.useEffect(() => {
    fetchLinks();
  }, []); 
  console.log(links);
  return (
    <main className='p-[5%] mt-[3%] px-[25%] flex-1 bg-[#F3F4F5] flex flex-col gap-10'>
        <section className='w-full flex justify-between'>
            <div>
              <h2 className='font-bold text-3xl '>My Links</h2>
              <p className='text-gray-400'>Manage and track your shortened digital assets.</p>
            </div>
            <div className='font-bold text-end'>
                <h2 className='text-3xl text-gray-400'>TOTAL ACTIVE</h2>
                <p className='text-2xl text-primary'>24</p>
            </div>
        </section>
        <section className="flex rounded-2xl w-full p-1.5 px-3 bg-white items-center gap-3">
           <AiOutlineSearch  size={33}/>
           <input className="flex-1 h-8 outline-none"/>
           <BsFilter size={33} />
        </section>
        <section>
          {links.map((link) => (
             <div key={link.id} className="bg-white p-5 w-full rounded-xl flex justify-between items-center">
              <div className=" flex flex-col gap-3 w-[70%]">
                <p className="text-primary font-bold flex items-center gap-3">
                  <BsLink size={30}/>
                  <span className="">{link.slug}</span>
                </p>
                <p className="line-clamp-1 w-full">{link.original_url}</p>
                <div className="flex items-center gap-5 text-gray-500 font-bold">
                  <p className="flex items-center gap-2">
                    <BiCalendar size={20}/>
                    <span>{new Date(link.created_at).toLocaleDateString("id-ID", {day: "2-digit", month: "long", year: "numeric",})}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <BsBarChartFill size={20}/>
                    <span>Jumlah Click</span>
                    <span> {link.clicks}</span>
                  </p>
                </div>  
              </div>
              <div className="flex gap-3">
                  <button className="text-blue-900 bg-purple-100 rounded-md p-2"><MdOutlineContentCopy size={25}/></button>
                  <button className="text-gray-500"><FaRegTrashAlt size={25}/></button>
              </div>
          </div>
          ))}
        </section>
    </main>
  )
}
