import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: ""
  });
  //default axios
  const token = JSON.parse(localStorage.getItem("auth"))?.token;
console.log("Token:", token);

axios.defaults.headers.common['Authorization'] = token;
  useEffect(()=>{
    const data = localStorage.getItem('auth');
    if(data){
        const parseData=JSON.parse(data);
        setAuth({
            ...auth,
            user:parseData.user,
            token:parseData.token
        })
    }
  },[])

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
