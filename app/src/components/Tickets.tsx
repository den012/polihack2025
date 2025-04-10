import React, { useEffect, useState } from 'react'
import axios from 'axios';

import { useAuth } from './hooks/useAuth';

const Tickets: React.FC = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const user = useAuth();

    const[tickets, setTickets] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchTickets = async () => {
        if(!user?.uid) {
            console.log("id not available");
            return;
        }
        
        try {
            setLoading(true);

            const response = await axios.post(`${API_URL}/api/events/getTickets`, 
                { user_id: user.uid }, // Request body
                { 
                    headers: {
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "true"
                    } 
                }
            );

            console.log(response.data);
            setTickets(response.data);
        } catch(error) {
            console.error("Error fetching tickets: ", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user?.uid) {
            console.log("fetching ticket for ", user.uid);
            fetchTickets();
        }
    }, [user]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-medium text-gray-800 mb-6">My Tickets</h1>
            
            {loading ? (
                <div className="flex justify-center items-center h-60">
                    <div className="animate-pulse flex flex-col items-center">
                        <div className="h-8 w-8 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-500">Loading your tickets...</p>
                    </div>
                </div>
            ) : tickets.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {tickets.map((ticket, index) => (
                        <div 
                            key={index} 
                            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
                        >
                            <div className="p-5">
                                <div className="flex items-center space-x-2 mb-4">
                                    <span className="bg-blue-100 text-blue-800 text-xs font-medium py-1 px-2 rounded">
                                        Ticket #{ticket.id || index + 1}
                                    </span>
                                </div>
                                
                                <h2 className="text-lg font-medium text-gray-800 mb-2">{ticket.name}</h2>
                                
                                <div className="space-y-2 text-sm text-gray-600">
                                    <div className="flex items-center">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span>{formatDate(ticket.date)}</span>
                                    </div>
                                    
                                    <div className="flex items-center">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>{ticket.location || ticket.venue || 'Venue TBA'}</span>
                                    </div>
                                    
                                    <div className="flex items-center">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        <span>{ticket.organizer}</span>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-8 text-center">
                    <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-800 mb-1">No tickets found</h3>
                    <p className="text-gray-500 mb-4">You don't have any tickets yet</p>
                    <button 
                        onClick={() => fetchTickets()} 
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center"
                    >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Refresh
                    </button>
                </div>
            )}
            
            {tickets.length > 0 && (
                <div className="mt-6 flex justify-center">
                    <button 
                        onClick={fetchTickets}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center"
                    >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Refresh tickets
                    </button>
                </div>
            )}
        </div>
    );
};

export default Tickets;