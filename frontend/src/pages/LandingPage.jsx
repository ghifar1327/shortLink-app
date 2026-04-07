import React from 'react'
import { Button } from '../components/common/Button'
import Input from '../components/common/Input'

export default function LandingPage() {
  return (
    <main className=''>
        <section className='w-full bg-gray-50 p-[5%] min-h-screen flex flex-col justify-center items-center text-center gap-10'>
            <h1 className='text-8xl w-[80%] font-bold '>Shorten URLs. <span className='text-primary'>Share Easily. </span></h1>
            <p className='text-[#434655] text-3xl w-[50%]'>Create short, memorable links for your team communications.Transform long, cumbersome URLs into powerful digital assets that drive engagement.</p> 
            <div className='flex text-xl'>
              <Button blue size="w-60 p-2">Get Started</Button>
              <Button><p className='text-gray-600'>Lear More</p></Button>
            </div>
            <div className='bg-white w-[50%] flex gap-5 rounded text-xl pl-3 p-2 shadow-xl shadow-gray-500'>
              <input className='outline-none w-full h-15 border border-gray-100 p-2' placeholder='https://very-long-architectural-url.com/asset-id-99238-x1'/>
              <Button blue size={"P-2 px-3"}>Shorten</Button>
            </div>
        </section> 
        <section className='flex justify-center p-[5%] bg-[#F3F4F5] min-h-screen flex-col gap-12'>
            <h1 className='text-primary text-xl'>Architectural Features</h1>
            <p className='font-bold text-5xl'>Built for Enterprise Precision</p>
            <div className='grid grid-cols-3 gap-5 w-full'>
                <article className='bg-white p-8 text-xl text-gray-500 flex flex-col gap-3 rounded-2xl'>
                    <img src="/Background.png" alt="easy create" className='w-10'/>
                    <h2 className='font-bold text-3xl text-black mt-3'>Easy Create</h2>
                    <p>Instantly generate high-performance short links with a single click or through our surgical API endpoints.</p>
                </article>
                <article className='bg-white p-8 text-xl text-gray-500 flex flex-col gap-3 rounded-2xl'>
                    <img src="/Background (1).png" alt="custom slug" className='w-10'/>
                    <h2 className='font-bold text-3xl text-black mt-3'>Custom Slugs</h2>
                    <p>Maintain brand authority with readable, custom link endings that resonate with your digital audience.</p>
                </article>
                <article className='bg-white p-8 text-xl text-gray-500 flex flex-col gap-3 rounded-2xl'>
                    <img src="/Background (2).png" alt="team ready" className='w-10'/>
                    <h2 className='font-bold text-3xl text-black mt-3'>Team Ready</h2>
                    <p>Collaborate across departments with shared workspaces, permissions, and unified analytics dashboards.</p>
                </article>
            </div>
        </section>
        <section className='grid grid-cols-2 w-full p-15 gap-15'>
            <div className=''>
                <img src="background.png" alt="shortLink" className='rounded-3xl w-full'/>
            </div>
            <article className='flex flex-col justify-center gap-10 text-3xl pr-[5%]'>
                <p className='text-gray-500'>Data Driven Insights</p>
                <p className='font-bold text-5xl'>Observe your link architecture in real-time.</p>
                <p className='text-gray-500'>Every click is a data point. Our dashboard provides surgical precision into where your traffic originates, who is engaging, and how your team communications are performing across the globe.</p>
                <ul className='flex justify-center flex-col gap-5'>
                    <li className='flex items-center gap-5'><img src="/Icon.png" alt="check" className='w-10'/><p >Geographic Distribution Maps</p></li>
                    <li className='flex items-center gap-5'><img src="/Icon.png" alt="check" className='w-10'/><p >Device & Browser Breakdown</p></li>
                    <li className='flex items-center gap-5'><img src="/Icon.png" alt="check" className='w-10'/><p >UTM Parameter Tracking</p></li>
                </ul>
            </article>
        </section> 
    </main>
  )
}
