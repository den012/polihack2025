import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';

import { Event, Category } from '../types/interfaces';

import Logo from '../assets/logo.png';



const Events: React.FC = () => {
    const API_URL = import.meta.env.VITE_API_URL;
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

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
    
        // Filter events based on the search query
        const baseEvents = selectedCategory ? events : allEvents; // Use events for the selected category or allEvents if no category is selected
        // console.log("base", baseEvents) 
        // console.log("events", events)
        // console.log("all", allEvents)
        const filtered = baseEvents.filter((event) =>
            event.name?.toLowerCase().includes(query) ||
            event.description?.toLowerCase().includes(query) ||
            event.location?.toLowerCase().includes(query)
        );
        setFilteredEvents(filtered);
    };

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
        <div className="bg-gradient-to-br from-orange-50 to-red-100 min-h-screen py-8">
            <div className="container mx-auto px-4">
                {/* Logo and Title */}
                <button
                    onClick={handleBack}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300 hover:shadow-lg transition-all duration-200 font-semibold absolute top-4"
                >
                    Back
                </button>
                <div className="flex flex-col items-center mb-8">
                    <img src={Logo} alt="Logo" className="w-24 mb-4 -rotate-6 shadow-lg" />
                    <h1 className="text-4xl font-bold text-gray-800 text-center">
                        Discover Amazing Events
                    </h1>
                </div>

                {/* Search Bar */}
                <div className="flex justify-center mb-8">
                    <div className="relative w-full max-w-lg">
                        <input
                            type="text"
                            placeholder="Search for events..."
                            value={searchQuery}
                            onChange={handleSearch}
                            className="w-full border-2 border-black p-3 rounded-full shadow-md focus:ring-orange-500 focus:border-orange-500 pl-12 font-bold text-xl outline-none"
                        />
                    </div>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    <button
                        className={`p-3 pl-4 pr-4 rounded-full font-semibold ${
                            selectedCategory === null
                                ? 'bg-orange-500 text-white shadow-md'
                                : 'bg-gray-200 text-gray-800 hover:bg-orange-200 transition-colors'
                        }`}
                        onClick={() => {
                            setSelectedCategory(null);
                            fetchEvents();
                        }}
                    >
                        All
                    </button>

                    {categories?.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => handleCategoryClick(category.name)}
                            className={`p-3 rounded-full font-semibold ${
                                selectedCategory === category.name
                                    ? 'bg-orange-500 text-white shadow-md'
                                    : 'bg-gray-200 text-gray-800 hover:bg-orange-200 transition-colors'
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                <h1 className="text-center text-2xl font-bold text-gray-800 mb-4">
                    Unsure of what to do?
                </h1>
                <div className="flex justify-center mb-5">
                    <button
                        onClick={suggestRandomEvent}
                        className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600 hover:shadow-lg transition-all duration-200 font-semibold"
                    >
                        Suggest an Event
                    </button>
                </div>

                {randomEvent && (
                    <div className="bg-[#f5f5f5] mb-5 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 mx-auto max-w-md">
                        <img
                            src={randomEvent.image}
                            alt={randomEvent.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-2">
                                {randomEvent.name}
                            </h2>
                            <p className="text-sm text-gray-600 mb-2">
                                {randomEvent.description}
                            </p>
                            <p className="text-sm text-gray-600">
                                <strong>Date:</strong> {formatDate(randomEvent.date)}
                            </p>
                            <p className="text-sm text-gray-600">
                                <strong>Price:</strong> ${randomEvent.price}
                            </p>
                            <p className="text-sm text-gray-600">
                                <strong>Location:</strong> {randomEvent.location}
                            </p>
                            <button
                                className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 hover:scale-105 transform transition-transform duration-200 w-full"
                                onClick={() => handleBuyNow(randomEvent)}
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                )}

                {/* Events Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map((event, index) => (
                            <div
                                key={index}
                                className="bg-[#f5f5f5] shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                            >
                                <img
                                    src={event.image}
                                    alt={event.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                                        {event.name}
                                    </h2>
                                    <p className="text-sm text-gray-600 mb-2">
                                        {event.description}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <strong>Date:</strong> {formatDate(event.date)}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <strong>Price:</strong> ${event.price}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <strong>Location:</strong> {event.location}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <strong>Organizer:</strong> {event.organizer}
                                    </p>
                                    <button
                                        className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 hover:scale-105 transform transition-transform duration-200 w-32"
                                        onClick={() => handleBuyNow(event)}
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-600 font-lg">
                            No events found with this name.
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Events;