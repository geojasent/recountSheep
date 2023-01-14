import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NavBar } from './components/Navbar';
import { Footer } from './components/Footer';
import HomePage from './pages/Home';
import DreamEntry from './pages/DreamEntry';
//add css font style atkinson hyperlegible

export interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
    return (
        <>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/dreamentry" element={<DreamEntry />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    );
};

export default App;
