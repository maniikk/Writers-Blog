import React ,{Component} from 'react'
import {Link} from 'react-router-dom'
import './Header.css'
function Header(props) {
    const authenticated = props.isAuthenticated
    return (
        <nav className = 'top-nav'>
            <span>Welcome!!</span>
            {authenticated ? 
                <span>Welcome</span>
                :<Link to = '/register' style = {{textDecoration: 'none', color: 'white'}}>
                    <span>Register/Login</span>
                </Link>}
        </nav>
    )
}
export default Header;