import React from 'react';

//firebase
import { auth, provider } from './Config';
import { signInWithPopup } from 'firebase/auth';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SignIn: React.FC = () => {
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);

            const token = await result.user.getIdToken(true);
            localStorage.setItem('firebaseToken', token);

            await axios.post(
                `${API_URL}/api/auth/login`, 
                {token}, 
                {withCredentials: true}
            );

            navigate('/home');
        } catch(error) {
            console.log('Login error!');
        }
    };

    return(
        <div className="flex flex-col m-10">
            <h1>Login</h1>
            <button
                onClick={handleGoogleSignIn}
            >Sign in here!</button>
        </div>
    )
}

export default SignIn;