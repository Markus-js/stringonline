import React, { useState, useEffect } from 'react'
import { useForm  } from 'react-hook-form'
import { doFetch } from '../../helpers/helper'
import { useHistory } from "react-router-dom";
import Style from './login.module.scss'
 
export function Login() {
 
  const [message, setMessage] = useState("Login")
  const [loginData, setLoginData] = useState([])

  let history = useHistory();
 
  const { register, handleSubmit, formState: { errors }, } = useForm();
 
  const onSubmit = (data, e) => getLogin(data, e);
 
  const getLogin = async (data, e) => {
 
    e.target.reset()
    let formData = new FormData()
    formData.append("username", data.username)
    formData.append("password", data.password)
 
    let url = "https://api.mediehuset.net/token"


 
    let res = await doFetch(url, 'POST', formData)
    handleSessionData(res)
 
  }
  
  const handleSessionData = (res) => {
    if (!res.message) {
      setLoginData(res)
      sessionStorage.setItem("token", JSON.stringify(res))
      
      console.log(res);
    }
    if (res.message === 'No authorization'){
      setMessage('Forkert brugernavn eller password - prøv igen')
    }
 
  }
 
  const logOut = () => {
    setLoginData([])
      sessionStorage.removeItem('token')
      setMessage('Du er nu logget ud')
 
      let timer = setTimeout(() => {
        setMessage('Login')
        clearTimeout(timer)
        // 
      }, 4000)
  }
  
  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setLoginData(JSON.parse(sessionStorage.getItem('token')))
    }
    
  }, [])

 
 
  return (
    <>
    <form className={Style.loginform} onSubmit={handleSubmit(onSubmit)}>
    <h4>{loginData.username ? `Du er nu logget ind som ${loginData.username}` : message}</h4>
        <input placeholder="Username" name="username" {...register("username", { required: true })}></input>
            {errors.username && <span>Udfyld username</span>}
 
        <input placeholder="Password" name="password" type="password" {...register('password', { required: true })}></input>
            {errors.password && <span>Udfyld password</span>}
 
        {!loginData.username && 
        <button className={Style.loginbtn}>Login</button>}
        <button className={Style.loginbtn}>Annuller</button>
        {loginData.username &&
        <button onClick={() => {logOut()}} className={Style.logoutbtn}>Log ud</button>
        }
    </form>
    </>
  )
}