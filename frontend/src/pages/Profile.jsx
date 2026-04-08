import { FiLogOut } from "react-icons/fi"; 
import { BiCheckShield } from "react-icons/bi"; 
import { AiOutlineBell } from "react-icons/ai"; 
import { BsLink } from "react-icons/bs"; 
import { AiOutlineCamera } from "react-icons/ai"; 
import React, { useEffect } from 'react'
import { useNavigate } from "react-router";
import http from "../lib/http";
import { Button } from "../components/common/Button";
import AuthContext from "../context/AuthContex";

export default function Profile() {
    const { logout } = React.useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        (async()=>{
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        if (!token || !user) {
          navigate("/login", { replace: true });
        }
        try {        
            const res = await http(`/api/auth/${user.id}`);
        } catch (err) {
          return err
        }          
    })()     
    }, [])
  return (
   <main className='p-[5%] mt-[3%] px-[25%] flex-1 bg-[#F3F4F5] flex flex-col gap-5'>
      <div className='w-full  bg-white p-8 rounded-2xl flex flex-col gap-10'>
        <section className='flex justify-between items-center'>
            <h1 className='text-5xl font-bold'>Profile</h1>
            <p className='text-bold text-l text-primary bg-[#DBE1FF] p-1.5 px-3 rounded-full w-fit'>PRO MEMBER</p>
        </section>
        <section className='flex items-center gap-5'>
          <div className="relative w-50 aspect-square overflow-hidden rounded">
            <button className="p-2 z-10 rounded-xl bg-white absolute text-primary border-2 border-gray-400 cursor-pointer right-0 bottom-0 hover:bg-gray-100"><AiOutlineCamera size={39}/></button>
            <img src="/profile.png" alt="user" className='rounded-xl w-full h-full object-cover'/>
          </div>
          <div>
            <h2 className='text-2xl font-bold'>John Doe</h2>
            <p className='text-gray-500'>john.doe@example.com</p>
          </div>
        </section>
        <section className="flex w-full gap-5">
            <div className="w-full p-7  bg-gray-200 rounded-2xl">
                <p className="text-2xl font-bold text-gray-500 mb-1">EMAIL ADDRESS</p>
                <p>user@example.com</p>
            </div>
            <dir className="w-full p-7  bg-gray-200 rounded-2xl">
                <p className="text-2xl font-bold text-gray-500 mb-1">ACCOUNT TENURE</p>
                <p>Member Since</p>
            </dir>
        </section>
        <section className="bg-primary rounded-2xl w-full p-7  py-10 flex justify-between items-center text-white">
            <div className="flex items-center gap-5">
                <div className="p-1 rounded-xl px-2 bg-white/20"><BsLink size={30}/></div>
                <div>
                    <p>ACTIVE ASSETS</p>
                    <p className="text-2xl font-bold">12</p>
                </div>
            </div>
            <button className="bg-white/20 border-white p-2 px-3 font-semibold rounded-md">VIEW LINKS</button>
        </section>
        <section className="flex flex-col text-gray-700">
            <p  className="flex items-center mb-2 gap-3"><AiOutlineBell size={30}/><span>Email Notifications</span></p>
            <p  className="flex items-center gap-3"><BiCheckShield size={30}/><span>Two-Factor Authentication</span></p>
        </section>
        <Button onClick={() => { logout(); navigate("/")}} border={"border-3 font-bold text-gray-500 border-gray-400 hover:border-primary"} ><FiLogOut />Logout Season</Button>
      </div>
   </main>
  )
}
