import { AiFillGoogleSquare } from "react-icons/ai";
import { AiOutlineGoogle } from "react-icons/ai";
import { AiFillGoogleCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router";
import Input from "../components/common/Input";
import { Button } from "../components/common/Button";
import { ArrowRight } from "lucide-react";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContex";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); 
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const  handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return;
    }
    const isLoggedin = await login(form);
    if (!isLoggedin) {
      return;
    }
    setForm({ email: "", password: ""});
    navigate("/");
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="w-[20%] flex flex-col border border-gray-300 shadow-2xl rounded gap-5 p-5 py-10 bg-white">
        <h1 className="text-3xl font-semibold">Welcome Back</h1>
        <p className="text-gray-500">Please enter your details to sign in.</p>
        <Input
          id={"email"}
          name="email"
          value={form.email}
          onChange={handleChange}
        >
          Email
        </Input>
        <div>
          <div className="flex justify-between">
            <label htmlFor="">Password</label>
            <Link className="text-primary">Forgot Password ?</Link>
          </div>
          <Input
            id={"password"}
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            password
          >
          </Input>
        </div>
        <Button type={"submit"} blue >
          Log In <ArrowRight></ArrowRight>
        </Button>
        <div className="flex justify-center items-center">
          <div className="h-0.5 bg-gray-200 w-[20%]"></div>
          <p className="px-3 text-gray-300">Or continue with</p>
          <div className="h-0.5 bg-gray-200 w-[20%]"></div>
        </div>
        <Button border={"border border-gray-200 hover:bg-gray-200"}>
          <AiOutlineGoogle /> Sign in white Google
        </Button>
      </form>
      <p>
        Don't have an account?{" "}
        <Link to="/register" className="text-primary">
          Sign up
        </Link>
      </p>
    </>
  );
}
