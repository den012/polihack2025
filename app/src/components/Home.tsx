import React from 'react';
import axios from 'axios';

import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

import { useAuth } from './hooks/useAuth';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const user = useAuth();

    const API_URL = import.meta.env.VITE_API_URL;

    const [words, setWords] = useState<string[]>([]);

    const fetchWords = async () => {
        try {
            const response = await axios.get(`${API_URL}/getWords`);
            console.log(response.data);
            setWords(response.data);
        } catch (error) {
            console.error('Error fetching words:', error);
        }
    };

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

            <button onClick={fetchWords} className="bg-purple p-2 w-40 h-10 ">Fetch Words</button>
            <div className="flex flex-col">
                {words.map((word, index) => (
                    <h1 key={index} className="text-2xl text-amber-700">{word}</h1>
                ))}
            </div>

            <button onClick={handleLogout} className="bg-blue-400 p-2 w-40 h-10 ">Logout</button>



        </div>
    )
}

export default Home;