import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.modules.css';

export function Footer() {
    return (
        <nav className="footer-container">
            <NavLink to="/about" style={{ textDecoration: 'none', color: 'black' }}>
                About
            </NavLink>
        </nav>
    );
}
