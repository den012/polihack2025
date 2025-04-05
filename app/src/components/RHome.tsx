import React from "react";

const RHome: React.FC = () => {
  return (
    <div>
        <div>
            <h1 className="text-3xl font-bold text-center mt-30">Hello</h1>
            <p className="text-lg text-center mt-2">Welcome to the Event Page</p>
        </div>
        
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="bg-gray-200 p-6 rounded-lg shadow-lg w-[800px] h-[350px]">
                <img
                src="https://via.placeholder.com/350x200"
                alt="Eveniment 1"
                className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">Concert Live</h3>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
                Participă
                </button>
            </div>
        </div>

        <div>
            <div className="py-16 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center">

                <div className="md:w-1/2 mb-8 md:mb-0">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Despre Evenimentele Noastre</h2>
                    <p className="text-gray-600 mb-4">Participă la evenimente de neuitat în orașul tău! Găsește evenimentele care se potrivesc pasiunilor tale, de la sporturi la concerte și cursuri.</p>
                    <a href="#" className="text-blue-500 hover:text-blue-700 transition">Vezi mai multe</a>
                </div>

                <div className="md:w-1/2">
                    <img src="https://via.placeholder.com/500x300" alt="Eveniment" className="w-full h-full object-cover rounded-lg shadow-lg"/>
                </div>

            </div>
        </div>


        </div>

        <div>
        <div className="bg-gray-800 py-4">
  <div className="max-w-7xl mx-auto px-4 flex justify-center">
    <ul className="flex space-x-8">
      
      <li className="relative">
        <a href="#evenimente-sportive" className="text-white hover:text-blue-500 transition">Evenimente </a>
        <div className="absolute hidden bg-gray-700 text-white p-4 w-48 top-8 left-0 space-y-2">
       
        </div>
      </li>

      
      <li className="relative">
        <a href="#muzica-concerte" className="text-white hover:text-blue-500 transition">evenimete 2</a>
        <div className="absolute hidden bg-gray-700 text-white p-4 w-48 top-8 left-0 space-y-2">
         
        </div>
      </li>
    </ul>
</div>
  
</div>

        </div>

        <div className="flex flex-wrap space-x-4 space-y-10 ml-30 mt-20 mr-20 mb-30 ">
            <div className="bg-gray-200 p-6 rounded-lg shadow-lg w-[350px] h-[400px]">
                <img
                src="https://via.placeholder.com/350x200"
                alt="Eveniment 1"
                className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">Concert Live</h3>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
                Participă
                </button>
            </div>
        </div>

    </div>
  );
};

export default RHome;
