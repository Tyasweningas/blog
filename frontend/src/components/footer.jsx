import React from 'react';

const Footer = () => (
    <footer className="mt-20 border-t-3 border-magazine-black py-12">
        <div className="magazine-container text-center">
            <h2 className="magazine-title text-2xl mb-4 italic">Blog</h2>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                © {new Date().getFullYear()} The Blog. All Rights Reserved.
            </p>
        </div>
    </footer>
);

export default Footer;
