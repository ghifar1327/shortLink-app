import { AiFillGoogleSquare } from "react-icons/ai"; 
import { AiOutlineGoogle } from "react-icons/ai"; 
import { AiFillGoogleCircle } from "react-icons/ai"; 
import { Link } from "react-router";
import Input from "../components/common/Input";
import { Button } from "../components/common/Button";
import { ArrowRight } from "lucide-react";

export default function LoginPage() {
  return (
    <>
     <section className="w-[20%] flex flex-col border border-gray-300 shadow-2xl rounded gap-5 p-5 py-10 bg-white">
       <h1 className="text-3xl font-semibold">Welcome Back</h1>
       <p className="text-gray-500">Please enter your details to sign in.</p>
       <Input >Email</Input>
       <div>
       <div className="flex justify-between">
         <label htmlFor="">Password</label>
         <Link className="text-primary">Forgot Password ?</Link>
       </div>
         <Input password ></Input>
       </div>
       <Button blue>Log In <ArrowRight></ArrowRight></Button>
       <div className="flex justify-center items-center">
         <div className="h-0.5 bg-gray-200 w-[20%]"></div>
         <p className="px-3 text-gray-300">Or continue with</p>
         <div className="h-0.5 bg-gray-200 w-[20%]"></div>
       </div>
       <Button border={"border border-gray-200 hover:bg-gray-200"}><AiOutlineGoogle /> Sign in white Google</Button>
     </section>
     <p>Don't have an account? <Link className="text-primary">Sign up</Link></p>
    </>
  )
}
