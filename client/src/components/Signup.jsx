import React, {useState, useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import './Signup.css'
import {AuthContext} from '../App'


const Signup = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const history = useHistory();
    const {
        setLoggedIn,
        setsignedUp,} = useContext(AuthContext)

    const signup = (e)=>{
        e.preventDefault()
        fetch('https://api-mern-todo-app.herokuapp.com/api/signup', {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            }), 
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.status==='true'){
                setLoggedIn(true)
                setsignedUp(true)
                console.log('approved')
                history.push('/')
                
            }else if(data.status==='exists'){
                alert('An account exists!')
                setsignedUp(true)
                history.push('/login')
            }else{
                alert('Sorry! An error occured.')
            }
        })
    }

    return (
        <div className="register">
            <div className="form">
            <form onSubmit={(e)=>signup(e)} className="register-form">
                <div className="form-floating mb-3">
                    <input 
                        type="text" 
                        className="form-control shadow-none" 
                        id="floatingInput" 
                        placeholder="name@example.com"
                        value={username}
                        onChange={e=>setUsername(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Username</label>
                </div>
                
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

                <button className="btn btn-primary register-btn">Sign me up!</button>
                <h6>
                    <Link to="/login" className="link-to-login">Already have an account?</Link>
                </h6>
            </form>
            </div>
        </div>
    )
}

export default Signup
