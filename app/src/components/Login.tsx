import React from 'react';

import Logo from '../assets/poze/logo2.png'

const Login: React.FC = () => {
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <div className='bg-gray-200 p-4 rounded shadow-md w-auto h-auto grid place-content-center space-y-20 '>
                <img src={Logo}
                    alt='Placeholder' 
                    className='mb-4 rotate-348 w-[200px] h-[150px] mx-auto' />
                <h1 className='text-1xl text-center text-[#52525B]'>“Connect to your health. Join events that matter!”</h1>
                <button className="flex items-center gap-5 px-20 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 transition bg-white mb-10">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                    <span className='text-[#52525B]'>Sign up with Google</span>
                </button>
            </div>
        </div>
    )
}

export default Login;