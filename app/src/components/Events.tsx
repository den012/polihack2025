import React, { useState, useEffect, useMemo } from 'react';
import { debounce } from "lodash";
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';

import { useAuth } from './hooks/useAuth';

import { Event, Category } from '../types/interfaces';

import Logo from '../assets/logo.png';



const Events: React.FC = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const user = useAuth();
    const navigate = useNavigate();
    const STRIPE_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
    const stripePromise = loadStripe(STRIPE_KEY);

    const [allEvents, setAllEvents] = useState<Event[]>([]); // State for all events
    const [events, setEvents] = useState<Event[]>([]); // State for currently displayed events
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
    const [randomEvent, setRandomEvent] = useState<Event | null>(null);


    const fetchEvents = async (categoryName?: string) => {
        try {
            const url = categoryName
                ? `${API_URL}/api/events/eventsByCategory/${categoryName}`
                : `${API_URL}/api/events/allEvents`;
            const response = await axios.get(url, {
                headers: {
                    "ngrok-skip-browser-warning": "true"
                }
            });
    
            const events = response.data.map((event: any) => ({
                ...event,
                name: event.name || 'Unnamed Event', // Ensure name is always set
            }));

            const shuffledEvents = events.sort(() => Math.random() - 0.5);

            if (!categoryName) {
                setAllEvents(shuffledEvents); // Store all events when no category is selected
            }
    
            setEvents(shuffledEvents); // Update events for the selected category
            setFilteredEvents(shuffledEvents); // Initialize filtered events
        } catch (error) {
            console.error("Error fetching events: ", error);
        }
    };

    const fetchCategory = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/events/categories`, {
                headers: {
                    "ngrok-skip-browser-warning": "true"
                }
            });
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories: ", error);
        }
    };

    useEffect(() => {
        fetchEvents(); // Fetch all events initially
        fetchCategory();
    }, []);

    const handleCategoryClick = (categoryName: string) => {
        setSelectedCategory(categoryName);
        fetchEvents(categoryName);
    };


    const debouncedSearch = useMemo(() => debounce((query : string) => {
        const baseEvents = selectedCategory ? events : allEvents;
        const filtered = baseEvents.filter((event) =>
            event.name?.toLowerCase().includes(query) ||
            event.description?.toLowerCase().includes(query) ||
            event.location?.toLowerCase().includes(query)
        );
        setFilteredEvents(filtered);
    },300),
    [selectedCategory, events, allEvents]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        debouncedSearch(query);
    };

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    },[debouncedSearch])

    const suggestRandomEvent = () => {
        if (filteredEvents.length > 0) {
            const randomIndex = Math.floor(Math.random() * filteredEvents.length);
            setRandomEvent(filteredEvents[randomIndex]);
        } else {
            setRandomEvent(null); // No events to suggest
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }


    const handleBuyNow = async (event: Event) => {
        const stripe = await stripePromise;

        if(!stripe) {
            console.error('Stripe.js has not loaded yet.');
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/api/payment/create-checkout-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "ngrok-skip-browser-warning": "true"
                },
                name: event.name,
                price: event.price,
                user_id: user?.uid || null,
                event_id: event.id,
            });

            const data = response.data;
            // console.log("data", data);

            if(data.url) {
                window.location.href = data.url;
            } else {
                console.error('Error creating checkout session:', data);
            }
        } catch(error) {
            console.error('Error during checkout session:', error);
        }
    };

    const handleBack = () => {
        navigate('/home');
    }

    // if(filteredEvents.length === 0 || categories.length === 0) {
    //     return (
    //         <div className="flex items-center justify-center min-h-screen bg-gray-200">
    //             <div className="animate-pulse flex flex-col items-center">
    //                 <div className="h-12 w-12 rounded-full border-4 border-t-orange-500 border-orange-200 animate-spin mb-4"></div>
    //                 <p className="text-gray-600 font-medium">Loading please wait...</p>
    //             </div>
    //         </div>
    //     );
    // }
    
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <header className="bg-white shadow-sm py-4 px-6 sticky top-0 z-10">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={handleBack}
                            className="text-gray-600 hover:text-gray-900 flex items-center transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                            <span className="hidden sm:inline">Back</span>
                        </button>
                        <img src={Logo} alt="Logo" className="w-[40px] h-auto" />
                    </div>
                    
                    <div className="w-full max-w-md">
                        <div className="relative">
                            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search events..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 py-6">
                {/* Categories */}
                <div className="mb-8 flex flex-nowrap overflow-x-auto gap-2 pb-2 scrollbar-hide">
                    <button
                        onClick={() => {
                            setSelectedCategory(null);
                            fetchEvents();
                        }}
                        className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
                            !selectedCategory 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        All Events
                    </button>
                    {categories?.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => handleCategoryClick(category.name)}
                            className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
                                selectedCategory === category.name 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Random Event Suggestion */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Events</h2>
                    <button
                        onClick={suggestRandomEvent}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center text-sm font-medium"
                    >
                        <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                        Suggest Random Event
                    </button>
                </div>
                
                {randomEvent && (
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8 border border-gray-100">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-blue-600">Featured Suggestion</h3>
                                <button
                                    onClick={() => setRandomEvent(null)}
                                    className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                            <div className="md:flex items-center">
                                <div className="md:w-1/3 mb-4 md:mb-0">
                                    <img
                                        src={randomEvent.image}
                                        alt={randomEvent.name}
                                        className="w-full h-64 object-cover rounded-lg"
                                    />
                                </div>
                                <div className="md:w-2/3 md:pl-6">
                                    <h3 className="text-xl font-semibold mb-2">{randomEvent.name}</h3>
                                    <p className="text-gray-600 mb-4 line-clamp-3">{randomEvent.description}</p>
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="flex items-center text-gray-700">
                                            <svg className="w-4 h-4 mr-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span>{formatDate(randomEvent.date)}</span>
                                        </div>
                                        <div className="flex items-center text-gray-700">
                                            <svg className="w-4 h-4 mr-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>${randomEvent.price}</span>
                                        </div>
                                        <div className="flex items-center text-gray-700">
                                            <svg className="w-4 h-4 mr-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span>{randomEvent.location}</span>
                                        </div>
                                    </div>
                                    <button
                                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors text-sm font-medium flex items-center"
                                        onClick={() => handleBuyNow(randomEvent)}
                                    >
                                        <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                        </svg>
                                        Buy Ticket
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {filteredEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredEvents.map((event, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-gray-100"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={event.image}
                                        alt={event.name}
                                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                                    />
                                    <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                                        ${event.price}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-1">{event.name}</h3>
                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{event.description}</p>
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center text-gray-700 text-sm">
                                            <svg className="w-4 h-4 mr-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span>{formatDate(event.date)}</span>
                                        </div>
                                        <div className="flex items-center text-gray-700 text-sm">
                                            <svg className="w-4 h-4 mr-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span className="line-clamp-1">{event.location}</span>
                                        </div>
                                    </div>
                                    <button
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors text-sm font-medium flex items-center justify-center"
                                        onClick={() => handleBuyNow(event)}
                                    >
                                        <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                        </svg>
                                        Buy Ticket
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-100">
                        <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-800 mb-1">No events found</h3>
                        <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
                        <button 
                            onClick={() => {
                                setSelectedCategory(null);
                                setSearchQuery('');
                                fetchEvents();
                            }}
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center"
                        >
                            <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Reset filters
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Events;