import { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../api/http-client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.exp * 1000 < Date.now()) {
                    logout();
                } else {
                    setUser({ id: decoded.userId });
                    fetchProfile();
                }
            } catch (err) {
                logout();
            }
        }
        setLoading(false);
    }, []);

    const fetchProfile = async () => {
        try {
            const { data } = await api.get('/auth/profile');
            setUser(data.user);
        } catch (err) {
            console.error('Failed to fetch profile', err);
        }
    };

    const login = async (email, password) => {
        const { data } = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', data.token);
        const decoded = jwtDecode(data.token);
        setUser({ id: decoded.userId });
        await fetchProfile();
    };

    const register = async (name, email, password) => {
        const { data } = await api.post('/auth/register', { name, email, password });
        localStorage.setItem('token', data.token);
        const decoded = jwtDecode(data.token);
        setUser({ id: decoded.userId });
        await fetchProfile();
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
