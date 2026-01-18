import { useState, useEffect } from 'react';
import api from '../api/http-client';
import { useAuth } from '../context/auth-context';
import PostCard from '../components/post-card';
import { SectionTitle } from '../components/base-ui';

const Profile = () => {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data } = await api.get('/auth/profile');
                setPosts(data.posts || []);
            } catch (err) {
                console.error('Failed to fetch profile data', err);
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    return (
        <div className="py-20">
            <div className="magazine-container">
                {/* Profile Header */}
                <div className="mb-20 border-b-3 border-magazine-black pb-12 flex flex-col md:flex-row md:items-end md:justify-between">
                    <div>
                        <span className="text-xs font-black uppercase tracking-[0.5em] text-gray-400 mb-4 block">Contributor Profile</span>
                        <h1 className="magazine-title text-7xl md:text-9xl tracking-tighter leading-none mb-4">{user?.name}</h1>
                        <p className="font-serif italic text-2xl text-gray-500">{user?.email}</p>
                    </div>
                    <div className="mt-8 md:mt-0 text-right">
                        <div className="inline-block border-2 border-magazine-black p-4">
                            <span className="block text-4xl font-serif font-bold">{posts.length}</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest">Masterpieces Published</span>
                        </div>
                    </div>
                </div>

                <SectionTitle subtitle="A curation of your published articles">Your Archives</SectionTitle>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin h-12 w-12 border-b-3 border-magazine-black rounded-full"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {posts.map(post => (
                            <PostCard key={post._id} post={post} />
                        ))}
                        {posts.length === 0 && (
                            <div className="col-span-full text-center py-20 border-2 border-dashed border-gray-200">
                                <p className="font-serif italic text-2xl text-gray-400">Your portfolio is currently a blank canvas.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
