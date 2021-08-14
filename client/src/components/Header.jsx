import React, {useContext} from 'react'
import './Header.css'
import {AuthContext} from '../App'
import {Link} from 'react-router-dom'

const Header = () => {

    const {loggedIn} = useContext(AuthContext)
    // console.log(loggedIn)
    return (
        <div>
            <header>
                <div className="main-link-container">
                <Link to="/" className="l">
                    <h2 className="main-link">Todo</h2>
                </Link>
                {
                    !loggedIn &&
                    <div className="link-container" style={{display:'flex'}}>
                        <Link to="/login" className="l login-link">
                            <h3 className="login">Log In</h3>
                        </Link>
                        <Link to="/signup" className="l">
                            <h3 className="signup">Sign Up</h3>
                        </Link>
                    </div>
                }
                {
                    loggedIn &&
                    <div className="signout-link">
                        <a href="/" className="sign-out-link">Sign Out</a>
                    </div>
                }
                </div>
            </header>
        </div>
    )
}

export default Header
