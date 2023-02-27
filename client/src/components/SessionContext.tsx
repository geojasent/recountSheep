import React, { createContext, useState } from 'react';

interface UserSessionContextType {
    id: string | null;
}

export const UserSessionContext = createContext<UserSessionContextType>(null!);

export const UserSessionContextProvider = ({ children }: any) => {
    const [currentUser, setCurrentUser] = useState<UserSessionContextType>({ id: localStorage.getItem('userId') || null });

    return <UserSessionContext.Provider value={currentUser}>{children}</UserSessionContext.Provider>;
};
