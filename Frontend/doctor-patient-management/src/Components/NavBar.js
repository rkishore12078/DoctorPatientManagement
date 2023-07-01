import 'bootstrap/dist/css/bootstrap.css'
import React from 'react';
import '../Css/NavBar.css'
import { Link } from 'react-router-dom';

function NavBar(){
    return(
        <div>
            <div className="nav">
                <input type="checkbox" id="nav-check"/>
                <div className="nav-header">
                    <div className="nav-title">
                    Welcome
                    </div>
                </div>
                <div className="nav-btn">
                    <label htmlFor="nav-check">
                    <span></span>
                    <span></span>
                    <span></span>
                    </label>
                </div>
                
                <div className="nav-links">
                    <Link to='/login'>Login</Link>
                    <a href="http://stackoverflow.com/users/4084003/" target="_blank">Stackoverflow</a>
                    <a href="https://in.linkedin.com/in/jonesvinothjoseph" target="_blank">LinkedIn</a>
                    <a href="https://codepen.io/jo_Geek/" target="_blank">Codepen</a>
                    <a href="https://jsfiddle.net/user/jo_Geek/" target="_blank">JsFiddle</a>
                </div>
            </div>
        </div>
    )
}

export default NavBar;