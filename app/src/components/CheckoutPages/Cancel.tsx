import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const Cancel: React.FC = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/events')
        }, 4000);

        return () => {clearTimeout(timer)};
    }, []);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-50">
            <h1 className="text-4xl font-bold text-red-600 mb-4">Something went wrong!</h1>
            <p className="text-gray-600 text-lg">You will be redirected to the events page shortly...</p>
        </div>
    );
}

export default Cancel;