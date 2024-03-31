export const useAuth = () => {
    const signIn = () => {
        localStorage.setItem('isAuthenticated', 'true');
    };
    const signOut = () => {
        localStorage.setItem('isAuthenticated', 'false');
    };
    const isAuthenticated = () => {
        return localStorage.getItem('isAuthenticated') === 'true';
    };
    return { signIn, signOut, isAuthenticated };
}

export type AuthContext = ReturnType<typeof useAuth>;