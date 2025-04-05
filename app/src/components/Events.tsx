import React from 'react';
import axios from 'axios';

import { useState } from 'react';

import { Event, Category } from  '../types/interfaces'

const Events: React.FC = () => {
    const API_URL = import.meta.env.VITE_API_URL;

    const [events, setEvents] = useState<Event[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const fetchEvents = async (categoryName?: string) => {
        try {
            const url = categoryName
                ? `${API_URL}/api/events/eventsByCategory/${categoryName}`
                : `${API_URL}/api/events/allEvents`;
            const response = await axios.get(url);
            setEvents(response.data);
        } catch (error) {
            console.error("Error fetching events: ", error);
        }
    };

    const fetchCategory = async () => {
        try {
            const response  = await axios.get(`${API_URL}/api/events/categories`);
            setCategories(response.data);
            console.log(response.data);
        } catch(error) {
            console.error("Error fetching categories: ", error);
        }
    }

    React.useEffect(() => {
        fetchEvents();
        fetchCategory();
    }, []);

    const handleCategoryClick = (categoryName: string) => {
        setSelectedCategory(categoryName);
        fetchEvents(categoryName);
    }



    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Events Page</h1>

            {/* Categories */}
            <div className="flex flex-wrap gap-3 mb-4">
            <button
                className={`p-3 rounded-lg ${
                    selectedCategory === null
                        ? 'bg-blue-500 text-white' // Highlighted style when "All" is selected
                        : 'bg-gray-200 text-gray-800' // Default style
                }`}
                onClick={() => {
                    setSelectedCategory(null); // Reset selected category to "All"
                    fetchEvents(); // Fetch all events
                }}
            >
                All
            </button>

                {categories?.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => handleCategoryClick(category.name)}
                        className={`p-3 rounded-lg ${
                            selectedCategory === category.name
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-800'
                        }`}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            {/* Events */}
            <div className="flex flex-wrap gap-4">
                {events.map((event) => (
                    <div
                        key={event.id}
                        className="bg-yellow"
                    >
                        <h2 className="text-lg font-bold mb-2">{event.name}</h2>
                        <p className="text-sm text-gray-600 mb-2">
                            {event.description}
                        </p>
                        <img
                            src={event.image}
                            alt={event.name}
                            className="w-full h-32"
                        />
                        <p className="text-sm text-gray-600">
                            <strong>Date:</strong> {event.date}
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
                        <button className="mt-2 bg-blue-500">
                            Buy Ticket
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Events;