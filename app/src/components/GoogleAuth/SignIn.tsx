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

    // return(
    //     // <div className="flex flex-col m-10">
    //     //     <h1>Login</h1>
    //     //     <button
    //     //         onClick={handleLogin}
    //     //     >Sign in here!</button>
    //     // </div>

    //     <div className='flex flex-col items-center justify-center h-screen'>
    //         <div className='bg-gray-200 p-4 rounded shadow-md w-auto h-auto grid place-content-center space-y-20 '>
    //             <img src={Logo}
    //                 alt='Placeholder' 
    //                 className='mb-4 rotate-348 w-[200px] h-[150px] mx-auto' />
    //             <h1 className='text-1xl text-center text-[#52525B]'>“Connect to your health. Join events that matter!”</h1>
    //             <button 
    //                 className="flex items-center gap-5 px-20 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 transition bg-white mb-10"
    //                 onClick={handleLogin}>
    //                 <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
    //                 <span className='text-[#52525B]'>Sign up with Google</span>
    //             </button>
    //         </div>
    //     </div>
    // )

    return (
        <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 px-4'>
            <div className='bg-white p-8 rounded-xl shadow-lg w-full max-w-md transition-all duration-300 hover:shadow-xl'>
                <div className='flex flex-col items-center space-y-8'>
                    {/* Logo */}
                    <div className='relative'>
                        <img 
                            src={Logo}
                            alt='Logo' 
                            // className='w-[180px] h-[135px] transform -rotate-12 transition-transform duration-300 hover:rotate-0' 
                            className="w-[200px] mb-3 h-auto transforom -rotate-12 transition-transform duration-300 hover:rotate-0"
                        />
                        <div className='absolute inset-0 bg-blue-400 rounded-full opacity-0 filter blur-xl animate-pulse z-[-1]'></div>
                    </div>
                    
                    {/* Tagline */}
                    <h1 className='text-lg text-center font-medium text-gray-600 italic'>
                        "Connect to your health. Join events that matter!"
                    </h1>
                    
                    {/* Sign In Button */}
                    <button 
                        onClick={handleLogin}
                        className="flex items-center justify-center gap-3 w-full py-3 px-6 border border-gray-200 rounded-lg shadow-sm 
                                   bg-white hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.02] 
                                   focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 group"
                    >
                        <img 
                            src="https://www.svgrepo.com/show/475656/google-color.svg" 
                            alt="Google" 
                            className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" 
                        />
                        <span className='text-gray-700 font-medium'>Sign in with Google</span>
                    </button>
                    
                    {/* Footer Text */}
                    <p className="text-sm text-gray-500 mt-6">
                        By signing in, you agree to our Terms of Service and Privacy Policy
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignIn;