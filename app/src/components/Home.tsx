import React from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';

import { useAuth } from './hooks/useAuth';

const Home: React.FC = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const user = useAuth();

    const handleLogout = async () => {
        try {
            const auth = getAuth(); // Get the Auth instance
            await signOut(auth); // Sign out the user
            navigate('/'); // Redirect to the home page
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    if(!user) {
        return (
            <h1>Loading please wait...</h1>
        )
    }
    return (
        <div className="flex flex-col m-10">
            <h1 className="text-7xl text-blue-700">Home page</h1>
            <h1 className="text-5xl text-orange-500">Welcome, {user?.displayName}</h1>

            <button onClick={handleLogout} className="bg-blue-400 p-2 w-40 h-10 ">Logout</button>


        </div>
    )
}

export default Home;