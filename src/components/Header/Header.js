import React from 'react';

const Header = () => {
    return (
        <div className="fixed z-50 w-screen bg-slate-300 p-6 px-16">
            {/* desktop and tablet */}
            <div className="hidden md:flex w-full bg-red-400 h-full p-4"></div>
            {/* mobile */}
            <div className="flex md:hidden w-full bg-blue-500 h-full p-4"></div>
        </div>
    );
};

export default Header;
