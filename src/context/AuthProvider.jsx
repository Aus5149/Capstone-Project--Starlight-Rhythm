import { useEffect, useState } from 'react';
import { AuthContext } from './authContext';
import { auth } from '../firebase';

export function AuthContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
       auth.onAuthStateChanged((user) => {
    
        setCurrentUser(user);
       });
    }, []);

    return (
        <AuthContext.Provider value={currentUser}>
            {children}
        </AuthContext.Provider>
    );
}