import React, { useState } from 'react'
import logo from '../assets/SVG.png';
import { GiHamburgerMenu } from "react-icons/gi";
import './NavBar.css'




const Navbar = () => {




    const [showMenu, setShowMenu] = useState(false);
    const ToggleMenu = () => {
        setShowMenu(!showMenu)
    }




    return (
        <nav className='nav-wrapper'>
            <div className="navbar">
                <div className='main'>
                    <img className='SVG' src={logo} alt="Logo" />
                    <span className='name'>Fello CFO</span>
                </div>


                <nav className={showMenu ? "menu-mobile" : "menu-web"}>
                    <div className="options">
                        <div><a className='anchor m11' href='#services'>Services</a></div>
                        <div><a className='anchor' href='#plans'>Plans</a></div>
                        <div><a className='anchor' href='#about'>About</a></div>
                        <div><a className='anchor m12' href='#resources'>Resources</a></div>
                        <button className='nav-button' onClick={() => window.location.href = '/signup'}>Get Started</button>
                    </div>
                </nav>

                <div className="ham-burger">
                    <button onClick={ToggleMenu}>
                        <GiHamburgerMenu />
                    </button>
                </div>

            </div>

        </nav>

    )
}

export default Navbar