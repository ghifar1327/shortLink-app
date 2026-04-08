  import { createContext} from "react";
  import useLocalStorage from "../hooks/useLocalStorage.js";
  import http from "../lib/http.js";

  const AuthContext = createContext(null);

  export function AuthProvider({ children }) {


      const [user, setUser] = useLocalStorage("user", null);

    
    
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
        setUser({ email: res.results.email , id: res.results.user_id, name: res.results.name , picture: res.results.picture, created_at: res.results.created_at })
        localStorage.setItem("token", res.results.token)
        return true
    
      } catch (err) {
          console.log(err)
          return false
      }
      }
    
    async function register(form) {
      const data = {
        name: form.name,
        email: form.email,
        password: form.password,
        confirm_password: form.confirmPassword
      }
      // console.log(data)
      try {
        const res = await http("/api/auth/register", JSON.stringify(data),{method: "POST"})
    
        if (!res.success) {
          throw new Error(res.message)
        }
        return true
      } catch (err) {
        console.log(err)
        return false
      }
    }

  async function updatePicture(file, id) {
    try {
      const formData = new FormData();
      formData.append("picture", file);
      const res = await http(`/api/user/${id}/picture`, formData, {
      method: "POST",
        isForm: true,
      });
  
      if (!res || !res.success) {
        throw new Error(res?.message);
      }
      setUser(res.results);
    } catch (err) {
      console.log(err);
    }
}

    function logout() {
      localStorage.removeItem("user");
      localStorage.removeItem("token")
      setUser(null);
      return true
    }

    return (
      <AuthContext.Provider
        value={{
          user,
          setUser,
          login,
          register,
          logout,
          updatePicture
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }

  export default AuthContext;