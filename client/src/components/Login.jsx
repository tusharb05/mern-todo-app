import React, {useState, useContext} from 'react'
import { useHistory, Link } from 'react-router-dom'
import {AuthContext} from '../App'
import './Login.css'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory();

    const {setLoggedIn,
        setUserDetails} = useContext(AuthContext)

    const submit = (e)=>{
        e.preventDefault()
        fetch('https://api-mern-todo-app.herokuapp.com/api/login', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password,
            }), 
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(res=>res.json())
        .then(data=>{
            // console.log(data)
            if(data.status==='logged in'){
                setLoggedIn(true)
                setUserDetails(data._doc)
                history.push('/')
            }else{
                history.push('/signup')
                alert('No Such Account Found')
            }
        })
    }
    return (
        <div className="login-bg">
            <form onSubmit={e=>submit(e)} className="my-form">

                <h4>Welcome!</h4>
                <div className="form-floating mb-3">
                    <input 
                        type="email" 
                        className="form-control shadow-none" 
                        id="floatingInput" 
                        placeholder="name@example.com"
                        value={email} 
                        onChange={e=>setEmail(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Email</label>
                </div>
                    
                <div className="form-floating mb-3">
                    <input 
                        type="password" 
                        className="form-control shadow-none" 
                        id="floatingInput" 
                        placeholder="name@example.com"
                        value={password} 
                        onChange={e=>setPassword(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Password</label>
                </div>

                <button type="submit" className="btn btn-primary login-btn">Login</button>

                <h6>
                    <Link to="/signup" className="register-link">Don't have an account?</Link>
                </h6>

            </form>
        </div>
    )
}

export default Login
