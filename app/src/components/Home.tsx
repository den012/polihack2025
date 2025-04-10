import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';


import { useAuth } from './hooks/useAuth';

//interfaces
import { Event } from '../types/interfaces';
import { messages } from '../types/messages';

//assets
import Logo from '../assets/logo.png'

const Home: React.FC = () => {
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;

    const [promotedEvents, setPromotedEvents] = useState<Event[]>([]);
    const [currentEventIndex, setCurrentEventIndex] = useState(0);

    const [message, setMessage] = useState<string | null>();

    const user = useAuth();

    
    useEffect(() => {
        const today = new Date();
        const randomIndex = today.getDate() % messages.length;
        setMessage(messages[randomIndex]);
    }, []);

    const handleLogout = async () => {
        try {
            const auth = getAuth(); // Get the Auth instance
            await signOut(auth); // Sign out the user
            navigate('/'); // Redirect to the home page
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const getPromotedEvent = async () => {
        try {
            // console.log(`${API_URL}/api/events/promotedEvents`); // Log the full URL
            const response = await axios.get(`${API_URL}/api/events/promotedEvents`, {
                headers: {
                    "ngrok-skip-browser-warning": "true"
                  }
            });
            // console.log(response.data);
            setPromotedEvents(response.data);
        } catch (error) {
            console.error("Error fetching promoted events: ", error);
        }
    };

    useEffect(() => {
        getPromotedEvent();
    },[]);

    useEffect(() => {
        if(promotedEvents.length > 0) {
            const interval = setInterval(() => {
                setCurrentEventIndex((prevIndex) => (prevIndex + 1) % promotedEvents.length);
            }, 10000); // cahnge 10 seconds)

            return () => clearInterval(interval);
        }
    }, [promotedEvents]);


    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-200">
                    <p className="text-gray-600 font-medium">Loading please wait...</p>
            </div>
        );
    }

    return (
        <div className="">
            <div className="min-h-screen">
                <img 
                    src={Logo}
                    alt="Logo" 
                    className="w-[60px]"      
                />
                <button 
                    onClick={handleLogout} 
                >
                    Logout
                </button>

                <h1 className="">
                    Hello, {user?.displayName || 'Guest'}!
                </h1>

                <p className="">Here's an idea :<span className="text-blue-600"> {message}</span></p>

                {promotedEvents.length > 0 && (
                    <>

                        <h1 className="text-xl">Featured Event🔥</h1>
                        <h2 className="text-xl">{promotedEvents[currentEventIndex].name}</h2>
                        <p className="text-gray-600">{promotedEvents[currentEventIndex].description}</p>
                        <button
                            className="bg-green-600"
                            onClick={() => navigate('/events')}>
                            Browse All Events
                        </button>
                        <img
                            src={promotedEvents[currentEventIndex].image}
                            alt="Health Events"
                            className="h-64 w-64" />
                    </> 
                )}

            </div>
        </div>
    );
}

export default Home;