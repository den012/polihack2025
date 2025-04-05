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

    // return (
    //     <div className="flex flex-col m-10">
    //         <h1 className="text-7xl text-blue-700">Home page</h1>
    //         <h1 className="text-5xl text-orange-500">Welcome, {user?.displayName}</h1>

    //         <button onClick={handleLogout} className="bg-blue-400 p-2 w-40 h-10 ">Logout</button>



    //     </div>
    // )

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-200">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full border-4 border-t-orange-500 border-orange-200 animate-spin mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading please wait...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br bg-[#fbf3f3]">
            <div className="min-h-screen">
                {/* Navigation Bar */}
                <nav className="bg-white shadow-md">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4 h-16">
                            <div className="flex items-center">
                                <img 
                                    src={Logo}
                                    alt="Logo" 
                                    className="w-[40px] sm:w-[150px] md:w-[80px] lg:w-[70px] h-auto mr-2 -rotate-4"      
                                />
                            </div>
                            <div>
                                <button 
                                    onClick={handleLogout} 
                                    className="bg-white text-gray-700 border border-gray-300 px-3 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-opacity-50 text-sm sm:text-base"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Welcome Banner - New section */}
                <div className="py-4 sm:py-6">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="flex flex-col">
                                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                                    Hello, <span className="text-orange-600">{user?.displayName || 'Guest'}</span>!
                                </h1>
                                <p className="mt-2 text-gray-600 text-sm sm:text-base">
                                    Welcome to your personalized health events dashboard
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center mt-6 space-y-4">
                    <div className="flex flex-col space-y-3 w-full max-w-md">
                            {/* Left-aligned message */}
                            <div className="flex items-start">
                                <div className="bg-gray-200 text-gray-800 rounded-3xl p-3 shadow-md max-w-xs">
                                    <p className="text-sm sm:text-base">Here's an idea :<span className="animate-pulse text-md font-bold"> {message}</span></p>
                                </div>
                            </div>

                            {/* Right-aligned message */}
                            <div className="flex items-end justify-end">
                                <div className="bg-blue-500 text-white rounded-3xl p-3 shadow-md max-w-xs">
                                    <p className="text-sm sm:text-base">On it, I'll find a spot in my schedule</p>
                                </div>
                            </div>

                    </div>
                </div>


                {/* Promoted event */}
                <div className="py-12 px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden bg-opacity-90">
                            <div className="md:flex">
                                {promotedEvents.length > 0 && (
                                    <>
                                    <div className="md:flex-1 p-8 flex flex-col justify-center">
                                        <h1 className="text-4xl font-extrabold mb-6">Featured Event🔥</h1>
                                        <h2 className="text-3xl font-bold text-gray-800 mb-4">{promotedEvents[currentEventIndex].name}</h2>
                                        <p className="text-gray-600 mb-6">{promotedEvents[currentEventIndex].description}</p>
                                        <button
                                            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition duration-200 shadow-md self-start focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-opacity-50"
                                            onClick={() => navigate('/events')}>
                                            Browse All Events
                                        </button>
                                    </div>
                                    <div className="md:flex-1">
                                        <img
                                            src={promotedEvents[currentEventIndex].image}
                                            alt="Health Events"
                                            className="h-64 w-full object-cover md:h-full" />
                                    </div>
                                    </> 
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Home;