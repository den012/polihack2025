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
        <div className="">
            <div className="">
                {/* Logo and Title */}
                <button
                    onClick={handleBack}
                >
                    Back
                </button>
                <img src={Logo} alt="Logo" className="w-24" />

                <input
                    type="text"
                    placeholder="Search for events..."
                    className="border border-black"
                    value={searchQuery}
                    onChange={handleSearch}
                />


                {/* Categories */}
                <button
                    onClick={() => {
                        setSelectedCategory(null);
                        fetchEvents();
                    }}>All
                </button>

                {categories?.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => handleCategoryClick(category.name)}
                    >{category.name}
                    </button>
                ))}

                <h1 className="">Unsure of what to do?</h1>
                    <button
                        onClick={suggestRandomEvent}
                        className="bg-blue-300"
                    >Suggest an Event
                    </button>

                {randomEvent && (
                    <div className="">
                        <img
                            src={randomEvent.image}
                            alt={randomEvent.name}
                            className="w-48 h-48 object-cover"
                        />
                        <div className="p-4">
                            <h2>
                                {randomEvent.name}
                            </h2>
                            <p>
                                {randomEvent.description}
                            </p>
                            <p>
                                <strong>Date:</strong> {formatDate(randomEvent.date)}
                            </p>
                            <p >
                                <strong>Price:</strong> ${randomEvent.price}
                            </p>
                            <p >
                                <strong>Location:</strong> {randomEvent.location}
                            </p>
                            <button
                                className="bg-red-400"
                                onClick={() => handleBuyNow(randomEvent)}
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                )}

                {/* Events Grid */}
                {filteredEvents.length > 0 ? (
                    filteredEvents.map((event, index) => (
                        <div
                            key={index}
                        >
                            <img
                                src={event.image}
                                alt={event.name}
                                className="w-48 h-48 object-cover"
                            />
                            <div className="p-4">
                                <h2>
                                    {event.name}
                                </h2>
                                <p>
                                    {event.description}
                                </p>
                                <p>
                                    <strong>Date:</strong> {formatDate(event.date)}
                                </p>
                                <p >
                                    <strong>Price:</strong> ${event.price}
                                </p>
                                <p>
                                    <strong>Location:</strong> {event.location}
                                </p>
                                <p>
                                    <strong>Organizer:</strong> {event.organizer}
                                </p>
                                <button
                                    className="bg-purple-700"
                                    onClick={() => handleBuyNow(event)}
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>
                        No events found with this name.
                    </div>
                )}

            </div>
        </div>
    );
};

export default Events;