import { useState } from 'react'

export const useAuth = () => {
    const [user, setUser] = useState<string | null>(null);

    const isAuthenticated = user !== null;

    const login = (username: string) => {
        setUser(username);
    };

    const logout = () => {
        setUser(null);
    };

    return {
        user,
        isAuthenticated,
        login,
        logout
    };
}

export type AuthContext = ReturnType<typeof useAuth>;