import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.modules.css';

export function Footer() {
    return (
        <nav className="footer-container">
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
        </nav>
    );
}
