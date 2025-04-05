import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Event, Category } from '../types/interfaces';

const Events: React.FC = () => {
    const API_URL = import.meta.env.VITE_API_URL;

    const [allEvents, setAllEvents] = useState<Event[]>([]); // State for all events
    const [events, setEvents] = useState<Event[]>([]); // State for currently displayed events
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

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

            if (!categoryName) {
                setAllEvents(response.data); // Store all events when no category is selected
            }

            setEvents(response.data); // Update events for the selected category
            setFilteredEvents(response.data); // Initialize filtered events
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
        const filtered = baseEvents.filter((event) =>
            event.name.toLowerCase().includes(query) ||
            event.description.toLowerCase().includes(query) ||
            event.location.toLowerCase().includes(query)
        );
        setFilteredEvents(filtered);
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Events Page</h1>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={handleSearch}
                className="border p-2 mb-4 w-full max-w-md"
            />

            {/* Categories */}
            <div className="flex flex-wrap gap-3 mb-4">
                <button
                    className={`p-3 rounded-lg ${
                        selectedCategory === null
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-800'
                    }`}
                    onClick={() => {
                        setSelectedCategory(null);
                        fetchEvents(); // Fetch all events
                    }}
                >
                    All
                </button>

                {categories?.map((category) => (
                    <button
                        key={category.id} // Use category.id as the key
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
                {filteredEvents.map((event, index) => (
                    <div
                        key={index} // Use event.id as the key
                        className="bg-white shadow-md rounded-lg p-4 w-64"
                    >
                        <h2 className="text-lg font-bold mb-2">{event.name}</h2>
                        <p className="text-sm text-gray-600 mb-2">
                            {event.description}
                        </p>
                        <img
                            src={event.image}
                            alt={event.name}
                            className="w-full h-32 object-cover rounded-md mb-2"
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
                        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                            Buy Ticket
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Events;