import React from 'react';
import Navbar from './navbar';
import Footer from './footer';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-magazine-white">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
