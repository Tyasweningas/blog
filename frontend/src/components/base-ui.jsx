import React from 'react';

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    return (
        <button className={`mag-btn mag-btn-${variant} ${className}`} {...props}>
            {children}
        </button>
    );
};

export const Input = ({ label, error, ...props }) => (
    <div className="mb-6 w-full">
        {label && <label className="mag-label">{label}</label>}
        <input
            {...props}
            className={`mag-input ${error ? 'border-red-500' : ''} ${props.className || ''}`}
        />
        {error && <p className="mag-error">{error}</p>}
    </div>
);

export const TextArea = ({ label, error, ...props }) => (
    <div className="mb-6 w-full">
        {label && <label className="mag-label">{label}</label>}
        <textarea
            {...props}
            className={`mag-textarea ${error ? 'border-red-500' : ''} ${props.className || ''}`}
        />
        {error && <p className="mag-error">{error}</p>}
    </div>
);

export const SectionTitle = ({ children, subtitle, className = "" }) => (
    <div className={`mb-12 text-center ${className}`}>
        <h2 className="magazine-title text-5xl md:text-7xl mb-2">{children}</h2>
        {subtitle && <p className="font-serif italic text-xl text-gray-600">{subtitle}</p>}
        <div className="w-24 h-1 bg-magazine-black mx-auto mt-6"></div>
    </div>
);
