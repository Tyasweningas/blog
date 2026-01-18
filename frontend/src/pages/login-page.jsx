import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import { Input, Button, SectionTitle } from '../components/base-ui';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="py-20 min-h-[80vh] flex items-center">
            <div className="magazine-container max-w-md w-full">
                <SectionTitle subtitle="Access your exclusive account">Login</SectionTitle>

                <form onSubmit={handleSubmit} className="border-3 border-magazine-black p-10 bg-white">
                    <Input
                        label="Email Address"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="editor@blog.com"
                    />
                    <Input
                        label="Password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                    />

                    {error && <p className="text-red-500 text-[10px] font-bold uppercase mb-6">{error}</p>}

                    <Button type="submit" className="w-full mb-6" disabled={loading}>
                        {loading ? 'Authenticating...' : 'Enter Journal'}
                    </Button>

                    <p className="text-center text-xs uppercase tracking-widest text-gray-500">
                        Don't have an account? <Link to="/register" className="text-magazine-black font-bold hover:underline">Apply Here</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
