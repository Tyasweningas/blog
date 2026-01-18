import { useState, useEffect } from 'react';
import api from '../api/http-client';
import { useAuth } from '../context/auth-context';
import PostCard from '../components/post-card';
import { Input, Button, SectionTitle } from '../components/base-ui';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchPosts();
    }, [page]);

    const fetchPosts = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        try {
            const { data } = await api.get(`/posts?search=${search}&page=${page}&limit=6`);
            setPosts(data.posts);
            setTotalPages(data.totalPages);
        } catch (err) {
            console.error('Failed to fetch posts', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="py-12">
            <div className="magazine-container">
                <SectionTitle subtitle="Discover the latest articles">
                    What's New
                </SectionTitle>

                <form onSubmit={(e) => { setPage(1); fetchPosts(e); }} className="max-w-xl mx-auto mb-16 flex items-end">
                    <Input
                        placeholder="Search our archives..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="text-2xl font-serif italic"
                    />
                    <Button variant="ghost" type="submit" className="mb-6">
                        <Search className="w-6 h-6" />
                    </Button>
                </form>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin h-12 w-12 border-b-3 border-magazine-black rounded-full"></div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {posts.map(post => (
                                <PostCard key={post._id} post={post} />
                            ))}
                        </div>

                        {posts.length === 0 && (
                            <div className="text-center py-20">
                                <p className="font-serif italic text-2xl text-gray-400 text-6xl">No records found.</p>
                            </div>
                        )}

    
                        {totalPages > 1 && (
                            <div className="mt-20 flex justify-center items-center space-x-12 border-t-2 border-magazine-black pt-12">
                                <Button
                                    variant="ghost"
                                    disabled={page === 1}
                                    onClick={() => setPage(prev => prev - 1)}
                                    className="flex items-center"
                                >
                                    <ChevronLeft className="w-4 h-4 mr-2" /> Previous
                                </Button>

                                <span className="font-serif italic text-xl">
                                    Page {page} of {totalPages}
                                </span>

                                <Button
                                    variant="ghost"
                                    disabled={page === totalPages}
                                    onClick={() => setPage(prev => prev + 1)}
                                    className="flex items-center"
                                >
                                    Next <ChevronRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
