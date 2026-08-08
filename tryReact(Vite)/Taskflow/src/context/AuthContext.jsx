import { createContext, useContext, useState, useEffect } from "react";
import { getMe } from "../api/usersApi";


const AuthContext = createContext();

export function AuthProvider({ children }) {
    
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);

    async function loadUser() {
        if (!token) {
            setUser(null);
            return;  
        }
        try {
            const data = await getMe();
            setUser(data);
        }
        catch(error) {
            logout();
        }
    }

    useEffect(() => {
        loadUser();
    }, [token]);

    function login(newToken) {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    }

    function logout() {
        localStorage.removeItem("token");
        setToken(null);
    }

    const isAuthenticated = token !== null;

    return (
        <AuthContext.Provider
            value={
                {token, user, login, logout, isAuthenticated}
            }
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}