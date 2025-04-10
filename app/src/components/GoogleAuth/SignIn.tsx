import React from 'react';

//firebase
import { auth, provider } from './Config';
import { signInWithPopup } from 'firebase/auth';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
                // body: JSON.stringify({
                //   name: user.displayName,
                //   email: user.email,
                // }),
            });
        } catch (error) {
            console.error("Error during sign-in: ", error);
        }
    }

    return (
        <div>
            <img 
                src={Logo}
                alt='Logo' 
                className="w-[200px]"
            />
                    
            {/* Sign In Button */}
            <button 
                onClick={handleLogin}
                className="bg-blue-500">
                <span>Sign in with Google</span>
            </button>
            
        </div>
    );
}

export default SignIn;