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
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-8 w-8 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-500">Loading your experience...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <img 
                            src={Logo}
                            alt="Logo" 
                            className="w-[40px] h-auto cursor-pointer"
                            onClick={() => navigate('/home')}
                        />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <div className="hidden md:flex mr-4 items-center">
                            <img src={user?.photoURL ?? ''} className="rounded-full w-10 mr-4" alt="User Avatar"></img>
                            <span className="text-gray-700 font-medium">{user?.displayName || 'Guest'}</span>
                        </div>
                        
                        <button 
                            onClick={() => navigate('/tickets')}
                            className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-3 py-2 rounded-lg transition-colors text-sm font-medium flex items-center"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                            </svg>
                            My Tickets
                        </button>
                        
                        <button 
                            onClick={handleLogout}
                            className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-3 py-2 rounded-lg transition-colors text-sm font-medium flex items-center"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 py-8">
                {/* Welcome Section */}
                <section className="mb-8">
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800 mb-1">
                                    Welcome back, {user?.displayName?.split(' ')[0] || 'there'}!
                                </h1>
                                <p className="text-gray-600 text-sm">
                                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                                </p>
                            </div>
                            
                            <button 
                                onClick={() => navigate('/events')}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium flex items-center"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Browse Events
                            </button>
                        </div>
                        
                        <div className="mt-5 bg-blue-50 rounded-lg p-4 flex items-center">
                            <svg className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-blue-700 text-sm">
                                <span className="font-medium">Today's Tip:</span> {message}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Featured Event and Quick Actions in a side-by-side layout */}
                <div className="flex flex-col lg:flex-row gap-6 mb-8">
                    {/* Featured Event - Left Column */}
                    <div className="lg:w-3/5">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-800 flex items-center">
                                Featured Events
                                <span className="ml-2 text-xl">🔥</span>
                            </h2>
                        </div>
                        
                        {promotedEvents.length > 0 ? (
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 h-full flex flex-col">
                                <div className="flex flex-col md:flex-row h-full">
                                    {/* Left side - Image */}
                                    <div className="md:w-1/2 relative">
                                        <img 
                                            src={promotedEvents[currentEventIndex].image} 
                                            alt={promotedEvents[currentEventIndex].name} 
                                            className="w-full h-full object-cover object-center"
                                            style={{ minHeight: "200px" }}
                                        />
                                        <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                                            Promoted 💵
                                        </div>
                                    </div>
                                    
                                    {/* Right side - Content */}
                                    <div className="md:w-1/2 p-6 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-xl font-bold mb-2 text-gray-800">
                                                {promotedEvents[currentEventIndex].name}
                                            </h3>
                                            
                                            <p className="text-gray-600 mb-4 line-clamp-3">
                                                {promotedEvents[currentEventIndex].description}
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <div className="space-y-2 mb-4">
                                                {promotedEvents[currentEventIndex].date && (
                                                    <div className="flex items-center text-gray-700">
                                                        <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        <span>{new Date(promotedEvents[currentEventIndex].date).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric'
                                                        })}</span>
                                                    </div>
                                                )}
                                                
                                                {promotedEvents[currentEventIndex].location && (
                                                    <div className="flex items-center text-gray-700">
                                                        <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                        <span className="line-clamp-1">
                                                            {promotedEvents[currentEventIndex].location}
                                                        </span>
                                                    </div>
                                                )}
                                                
                                                {promotedEvents[currentEventIndex].price && (
                                                    <div className="flex items-center text-gray-700">
                                                        <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <span>${promotedEvents[currentEventIndex].price}</span>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            <button 
                                                onClick={() => navigate('/events')}
                                                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium flex items-center justify-center"
                                            >
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l4-4-4-4m6 8h6" />
                                                </svg>
                                                View All Events
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 p-6 text-center h-full">
                                <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                                <h3 className="text-lg font-semibold text-gray-800 mb-1">No featured events available</h3>
                                <p className="text-gray-500 mb-4">Check back later for upcoming featured events</p>
                                <button 
                                    onClick={() => navigate('/events')}
                                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    Browse all events
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                    
                    {/* Quick Actions - Right Column */}
                    <div className="lg:w-2/5">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
                        <div className="grid gap-4">
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                                <div 
                                    className="p-6 cursor-pointer"
                                    onClick={() => navigate('/events')}
                                >
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-4">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800 mb-1">Find Events</h3>
                                            <p className="text-sm text-gray-500">Discover events near you</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                                <div 
                                    className="p-6 cursor-pointer"
                                    onClick={() => navigate('/tickets')}
                                >
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-600 mr-4">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800 mb-1">Your Tickets</h3>
                                            <p className="text-sm text-gray-500">View your purchased tickets</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                                <div 
                                    className="p-6 cursor-pointer" 
                                    onClick={() => {
                                        if(promotedEvents.length > 0) {
                                            const randomIndex = Math.floor(Math.random() * promotedEvents.length);
                                            setCurrentEventIndex(randomIndex);
                                        }
                                    }}
                                >
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 mr-4">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800 mb-1">Random Event</h3>
                                            <p className="text-sm text-gray-500">Discover something new</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Quick Action */}
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                                <div 
                                    className="p-6 cursor-pointer"
                                    onClick={handleLogout}
                                >
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 text-red-600 mr-4">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800 mb-1">Log Out</h3>
                                            <p className="text-sm text-gray-500">Sign out of your account</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Home;