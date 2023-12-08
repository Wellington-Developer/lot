// React Context
import { createContext, useState } from "react"
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from "./api";
import { useNavigate } from "react-router-dom";

// React Hooks
import { useEffect } from "react";

export const UserContext = createContext();


export const UserStorage = ({ children }) => {
  const [ data, setData ] = useState(null);
  const [ login, setLogin ] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  const navigate = useNavigate()
  
  const validateUser = async () => {
    const token = window.localStorage.getItem('token')
    
    if(token) {
      try {
        setError('null');
        setLoading(true);
        const { url, options } = TOKEN_VALIDATE_POST(token);
        const response = await fetch(url, options);
        if(!response.ok) throw new Error('Token inválido')
        await getUser(token)
      } catch(err) {
        logoutUser();
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

  }
  
  const logoutUser = () => {
    setData(null);
    setLogin(null);
    setLoading(false);
    setError(null);
    window.localStorage.removeItem('token');
  }
  
  const getUser = async (token) => {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json()
    setData(json)
    setLogin(true)
  }
  
  const userLogin = async (username, password) => {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({username, password});
      const tokenRes = await fetch(url, options);
      if(!tokenRes.ok) throw new Error(`Erro: ${tokenRes.statusText}`)
      const { token } = await tokenRes.json()
      window.localStorage.setItem('token', token)
      await getUser(token)
      navigate('/account')
    } catch(err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    validateUser()
  }, [])

  return (
    <UserContext.Provider value={{ userLogin, data, login, logoutUser, error, loading, login }}>
      { children }
    </UserContext.Provider>
  )
}