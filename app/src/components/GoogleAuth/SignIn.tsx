import React from 'react';

//firebase
import { auth, provider } from './Config';
import { signInWithPopup } from 'firebase/auth';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';


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

    return(
        <div className="flex flex-col m-10">
            <h1>Login</h1>
            <button
                onClick={handleLogin}
            >Sign in here!</button>
        </div>
    )
}

export default SignIn;