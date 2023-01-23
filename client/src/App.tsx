import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NavBar } from './components/Navbar';
import { Footer } from './components/Footer';
import HomePage from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import DreamEntry from './pages/DreamEntry';
import ViewDreams from './pages/ViewDreams';
import 'bootstrap/dist/css/bootstrap.min.css';

//add font selector for normal font and atkinson hyperlegible font

export interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
    return (
        <>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dreamentry" element={<DreamEntry />} />
                    <Route path="/viewdreams" element={<ViewDreams />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    );
};

export default App;
