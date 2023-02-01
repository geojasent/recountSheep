import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NavBar } from './components/Navbar';
import { Footer } from './components/Footer';
import HomePage from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Logout from './components/Logout';
import DreamEntry from './pages/DreamEntry';
import DisplayDreams from './pages/ViewDreams';
import { UserSessionContextProvider } from './components/SessionContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavigationContainer } from '@react-navigation/native';
import './components/pageContainer.modules.css';

//add font selector for normal font and atkinson hyperlegible font
export interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
    return (
        <>
            <UserSessionContextProvider>
                <NavigationContainer>
                    <BrowserRouter>
                        <div id="pageContainer" style={{ background: 'linear-gradient(#19547b, #ffd89b)' }}>
                            <NavBar />
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/signup" element={<SignUp />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/logout" element={<Logout />} />
                                <Route path="/dreamentry" element={<DreamEntry />} />
                                <Route path="/viewdreams" element={<DisplayDreams />} />
                            </Routes>
                            <Footer />
                        </div>
                    </BrowserRouter>
                </NavigationContainer>
            </UserSessionContextProvider>
        </>
    );
};

export default App;
