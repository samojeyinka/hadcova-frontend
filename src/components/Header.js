import React, { useState } from 'react';
import { FaBars, FaPlus, FaList,FaHome,FaBook } from 'react-icons/fa';
import '../styles/Header.css';
import { Link } from 'react-router-dom';




const Header = () => {
    const [click, setClick] = useState(false);

    const menuHandler = () => setClick(!click)
    const closeMenu = () => setClick(!click)

    return (
        <header className='header'>
            <div>
                <i className='hamburger-icon' onClick={menuHandler}><FaBars /></i>
                <nav className={click ? 'menu-links active' : 'menu-links'}>
                    <ul>
                        <Link to='/' onClick={closeMenu}><li><FaHome /> <span>Home</span></li></Link>
                        <Link to='/create-category' onClick={closeMenu}><li><FaPlus /> <span>Add categories</span></li></Link>
                        <Link to='/all-categories' onClick={closeMenu}><li><FaList /> <span>Categories</span></li></Link>
                        <Link to='/tasks' onClick={closeMenu}><li><FaBook /> <span>All tasks</span></li></Link>
                    </ul>
                </nav>

            </div>


        </header>
    )
}

export default Header