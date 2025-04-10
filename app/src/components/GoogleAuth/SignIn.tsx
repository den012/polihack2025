import React from 'react';

//firebase
import { auth, provider } from './Config';
import { signInWithPopup } from 'firebase/auth';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { FcGoogle } from 'react-icons/fc';
//assets
import Logo from '../../assets/logo.png'


const SignIn: React.FC = () => {
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;

    const handleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            navigate('/home');

            console.log("User Info: ", user.displayName, user.email);

            await axios.post(`${API_URL}/api/auth/google`, {
                withCredentials: true,
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                name: user.displayName,
                email: user.email,
                uid: user.uid,
                photo: user.photoURL
            });
        } catch (error) {
            console.error("Error during sign-in: ", error);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
                <div className="flex justify-center">
                    <img 
                        src={Logo}
                        alt='Logo' 
                        className="w-[180px] mb-6"
                    />
                </div>
                
                <h2 className="text-center text-2xl font-bold text-gray-800">Welcome</h2>
                <p className="text-center text-sm text-gray-500 mb-8">Sign in to continue to the application</p>
                        
                {/* Sign In Button */}
                <button 
                    onClick={handleLogin}
                    className="group relative w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 text-sm font-medium text-gray-700 transition duration-150 ease-in-out">
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <FcGoogle className="text-xl" />
                    </span>
                    <span>Sign in with Google</span>
                </button>
                
                <p className="mt-6 text-center text-xs text-gray-500">
                    By signing in, you agree to our Terms of Service and Privacy Policy
                </p>
            </div>
        </div>
    );
}

export default SignIn;