import React, { createContext, useState } from 'react';

interface UserSessionContextType {
    id: string | null;
}

export const UserSessionContext = createContext<UserSessionContextType>(null!);

export const UserSessionContextProvider = ({ children }: any) => {
    const [currentUser, setCurrentUser] = useState<UserSessionContextType>({ id: sessionStorage.getItem('userId') || null });
    try {
        sessionStorage.getItem('userId');
    } catch (err) {
        alert(err);
    }
    try {
        sessionStorage.setItem('test', 'testvalue');
    } catch (err) {
        alert(err);
    }
    function isLocalStorageEnabled() {
        try {
            var mod = '__storage_test__';
            localStorage.setItem(mod, mod);
            localStorage.removeItem(mod);
            return true;
        } catch (e) {
            return false;
        }
    }
    isLocalStorageEnabled();
    function isSessionStorageEnabled() {
        try {
            var mod = '__storage_test__';
            sessionStorage.setItem(mod, mod);
            sessionStorage.removeItem(mod);
            return true;
        } catch (e) {
            return false;
        }
    }
    isSessionStorageEnabled();
    return <UserSessionContext.Provider value={currentUser}>{children}</UserSessionContext.Provider>;
};
