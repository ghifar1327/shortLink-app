import React, { useContext, useState } from "react";
import Input from "../components/common/Input";
import { Link, useNavigate } from "react-router";
import { Button } from "../components/common/Button";
import { ArrowRight } from "lucide-react";
import { AiOutlineGoogle } from "react-icons/ai";
import AuthContext from "../context/AuthContex";

export default function RegisterPage() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate(); 
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const  handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password || !form.confirmPassword) {
      return;
    }

    if (form.password !== form.confirmPassword) {
      return;
    }
    const isRegistered = await register(form);
    if (!isRegistered) {
      return;
    }
    setForm({ email: "", password: "", confirmPassword: "" });
    navigate("/login");
  };
  return (
    <>
      <div className="text-center flex flex-col gap-3">
        <h1 className="text-3xl font-semibold">Cteate Account</h1>
        <p className="text-gray-500">Join the elite architects of the web.</p>
      </div>
      <form onSubmit={handleSubmit} className="border border-gray-300 shadow-2xl w-[20%] flex flex-col gap-5 p-5 py-10 rounded bg-white">
        <Input
          id={"email"}
          name="email"
          value={form.email}
          onChange={handleChange}
        >
          Email
        </Input>
        <Input
          password
          id={"password"}
          name="password"
          value={form.password}
          onChange={handleChange}
        >
          Password
        </Input>
        <Input
          password
          id={"confirmPassword"}
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
        >
          Confirm Password
        </Input>
        <Button type={"submit"} blue>
          Sign Up <ArrowRight></ArrowRight>
        </Button>
        <p className="text-xs text-center">
          By signing up, you agree to our Terms of Service and By signing up,
          you agree to our Terms of Service and Police
        </p>
      </form>
      <p>
        Already have an account?{" "}
        <Link to="/login" className="text-primary">
          Log in
        </Link>
      </p>
    </>
  );
}
