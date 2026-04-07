  import { createContext, useState } from "react";
  import useLocalStorage from "../hooks/useLocalStorage.js";
  import http from "../lib/http.js";

  const AuthContext = createContext(null);

  export function AuthProvider({ children }) {


      const [user, setUser] = useLocalStorage("user", null);
      const [isError, setIsError] = useState(false);
      const [isSuccess, setIsSuccess] = useState(false);
      const [message, setMessage] = useState("")
    
    
    async function login(form) {
        const data = {
        email: form.email,
        password: form.password,
      }
      
      try {
        const res = await http("/api/auth/login", JSON.stringify(data),{method: "POST"})
    
        if (!res.success) {
          throw new Error(res.message)
        }
        console.log(res)
        setUser({ email: res.results.email , id: res.results.user_id})
        localStorage.setItem("token", res.results.token)
        setIsError(false)
        setIsSuccess(true)
        setMessage(res.message)
        return true
    
      } catch (err) {
        setIsError(true)
        setIsSuccess(false)
        setMessage(err.message || "Someting is Wrong")
          return false
      }
      }
    
    async function register(form) {
      const data = {
        email: form.email,
        password: form.password,
          confirm_password: form.confirmPassword
      }
      
      try {
        const res = await http("/api/auth/register", JSON.stringify(data),{method: "POST"})
    
        if (!res.success) {
          throw new Error(res.message)
        }
        setIsError(false)
        setIsSuccess(true)
        setMessage(res.message)
        return true
      } catch (err) {
        setIsError(true)
        setIsSuccess(false)
        setMessage(err.message || "Someting is Wrong")
        return false
      }
    }


    function logout() {
      localStorage.removeItem("user");
      localStorage.removeItem("token")
      setUser(null);
      setIsSuccess(false);
      setIsError(false);
      return true
    }

    return (
      <AuthContext.Provider
        value={{
          user,
          login,
          register,
          logout,
          isError,
          setIsError,
          isSuccess,
          setIsSuccess,
          message
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }

  export default AuthContext;