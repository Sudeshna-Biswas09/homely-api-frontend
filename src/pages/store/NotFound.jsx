import React from 'react';

const NotFound = () => {
  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-50">
      
      <header className="w-full">
        <h1 className="bg-red-400 text-center text-white py-4 text-2xl font-bold">
          404! Your page is not found
        </h1>
      </header>

      <div className="mt-16 flex flex-col items-center">
        <img 
          src="https://c.tenor.com/8qN4MxNMk9oAAAAC/tkthao219-peach.gif" 
          alt="confused emoji" 
          className="shadow-lg rounded-xl"
        />
      </div>

    </main>
  );
};

export default NotFound;