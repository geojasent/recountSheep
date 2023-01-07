import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.modules.css';

export function NavBar() {
    return (
        <nav className="navbar-container">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/dreamentry">Dream Entry</NavLink>
            <NavLink to="/viewdreams">View Dreams</NavLink>
        </nav>
    );
}
