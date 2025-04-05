import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
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

    // const [word, setWord] = useState<string>('');
    // const [words, setWords] = useState<{ id: string; text: string }[]>([]);

    // const fetchWords = async () => {
    //     const response = await axios.get(`${API_URL}/getWords`);
    //     // console.log(response.data);
    //     setWords(response.data.map((w: any) => ({ id: w.id, text: w.text })));
    // }

    // const addWord = async () => {
    //     if(!word.trim()) {
    //         return;
    //     }
    //     await axios.post(`${API_URL}/addWord`, { word });
    //     setWord('');
    //     fetchWords();
    // }

    // useEffect(() => {
    //     fetchWords();
    // },[])


    if(!user) {
        return (
            <h1>Loading please wait...</h1>
        )
    }

    return (
        <div className="flex flex-col m-10">
            <h1 className="text-7xl text-blue-700">Home page</h1>
            <h1 className="text-5xl text-orange-500">Welcome, {user?.displayName}</h1>

            {/* <input type="text" 
                placeholder="Enter a word"
                className="border-2 border-black text-lg"
                value={word}
                onChange={(e) => setWord(e.target.value)}
            ></input>
            <button className="bg-purple p-2 w-40 h-10"
                onClick={addWord}
            >Send</button>

            <div>
                <h1>words</h1>
                {words.map((wordObj: { id: string; text: string }) => (
                    <p key={wordObj.id}>{wordObj.text}</p>
                ))}
            </div> */}

            <button onClick={handleLogout} className="bg-blue-400 p-2 w-40 h-10 ">Logout</button>



        </div>
    )
}

export default Home;