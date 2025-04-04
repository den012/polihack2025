import React from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface User {
    name: string;
    email: string;
    picture: string;
    id?: string;
}


const Home: React.FC = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<Boolean>(true);

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem('firebaseToken');
            if(!token) {
                navigate('/');
                return;
            }

            const response = await axios.get(`${API_URL}/api/auth/user`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });

            const userData = response.data;
            setUser(userData);
            setLoading(false);
        } catch (error) {
            console.log('Error fetching user data:', error);
            setLoading(false);
            navigate('/');
        }
    }

    const handleLogout = async () => {
        try{
            const token = localStorage.getItem('firebaseToken');
            await axios.post(`${API_URL}/api/auth/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });
            localStorage.removeItem('firebaseToken');
            navigate('/');
        } catch (error) {
            console.log('Error logging out:', error);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);


    if(loading) {
        return (
            <h1>Loading please wait...</h1>
        )
    }
    return (
        <div className="flex flex-col m-10">
            <h1 className="text-7xl text-blue-700">Home page</h1>
            <h1 className="text-5xl text-orange-500">Welcome, {user?.name}</h1>

            <button onClick={handleLogout} className="bg-blue-400 p-2 w-40 h-10 ">Logout</button>


        </div>
    )
}

export default Home;