import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import { LogOut, User, PlusCircle } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <nav className="border-b-3 border-magazine-black py-4 bg-magazine-white sticky top-0 z-50">
            <div className="magazine-container flex justify-between items-center">
                <Link to="/" className="magazine-title text-4xl block">BLOG</Link>

                <div className="flex items-center space-x-8 text-sm font-bold tracking-widest uppercase">
                    <Link to="/" className="hover:underline underline-offset-4 transition-all">Home</Link>
                    {user ? (
                        <>
                            <Link to="/create-post" className="flex items-center hover:underline underline-offset-4 transition-all">
                                <PlusCircle className="w-4 h-4 mr-1" /> Create
                            </Link>
                            <Link to="/profile" className="flex items-center hover:underline underline-offset-4 transition-all">
                                <User className="w-4 h-4 mr-1" /> Profile
                            </Link>
                            <button onClick={() => { logout(); navigate('/'); }} className="flex items-center hover:underline underline-offset-4 transition-all focus:outline-none cursor-pointer">
                                <LogOut className="w-4 h-4 mr-1" /> Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:underline underline-offset-4 transition-all">Login</Link>
                            <Link to="/register" className="hover:underline underline-offset-4 transition-all px-4 py-2 border-2 border-magazine-black hover:bg-magazine-black hover:text-magazine-white">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
