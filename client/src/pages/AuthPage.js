import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/auth.context";

export const AuthPage = () => {
  const auth=useContext(AuthContext)
   const message= useMessage()
    const {loading, error, request,clearError} = useHttp()
    const [form, setForm] = useState({
        email: "",
        password: ""
    })
    useEffect(()=>{
message(error)
        clearError()
    },[error,message,clearError])
    useEffect(()=>{
window.M.updateTextFields()
    },[])
    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    const loginHandler = async () => {
        try {
            const data = await request("/api/auth/login", "POST", {...form})
            auth.login(data.token,data.userId)
        } catch (e) {

        }
    }
    const registerHandler = async () => {
        try {
            const data = await request("/api/auth/register", "POST", {...form})
            message(data.message)
            loginHandler()
        } catch (e) {

        }
    }


    return (
        <div className='row'>
            <div className="col s6 offset-s3">
                <h1>Cut links</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authenticated user </span>
                        <div>

                            <div className="input-field">
                                <input placeholder="Input email" id="email" type="text" name="email"value={form.email}
                                       className="yellow-input" onChange={changeHandler}/>
                                <label htmlFor="first_name">Email</label>
                            </div>
                            <div className="input-field">
                                <input placeholder="Input password" id="Password" type="password" name="password"
                                      value={form.password} className="yellow-input" onChange={changeHandler}/>
                                <label htmlFor="first_name">Password</label>
                            </div>


                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn yellow darken-4" style={{marginRight: 10}} disabled={loading} onClick={loginHandler} >Sing in</button>
                        <button className="btn grey lighten-1 black-text" onClick={registerHandler}disabled={loading}>Sing up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
