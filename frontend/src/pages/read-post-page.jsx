import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/http-client';
import { useAuth } from '../context/auth-context';
import { Button, SectionTitle, TextArea } from '../components/base-ui';
import dayjs from 'dayjs';
import { Trash2, Edit3, MessageCircle } from 'lucide-react';

const PostDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchPost();
    }, [id]);

    const fetchPost = async () => {
        try {
            const { data } = await api.get(`/posts/${id}`);
            setPost(data);
        } catch (err) {
            console.error('Failed to fetch post', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDeletePost = async () => {
        if (window.confirm('Are you sure you want to delete this masterpiece?')) {
            try {
                await api.delete(`/posts/${id}`);
                navigate('/');
            } catch (err) {
                alert('Failed to delete post');
            }
        }
    };

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!comment.trim()) return;
        setSubmitting(true);
        try {
            await api.post(`/posts/${id}/comments`, { content: comment });
            setComment('');
            fetchPost();
        } catch (err) {
            alert('Failed to add comment');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (window.confirm('Delete this comment?')) {
            try {
                await api.delete(`/comments/${commentId}`);
                fetchPost();
            } catch (err) {
                alert('Failed to delete comment');
            }
        }
    };

    if (loading) return (
        <div className="flex justify-center py-20">
            <div className="animate-spin h-12 w-12 border-b-3 border-magazine-black rounded-full"></div>
        </div>
    );

    if (!post) return (
        <div className="magazine-container py-20 text-center">
            <SectionTitle subtitle="The requested archives are missing">Not Found</SectionTitle>
            <Link to="/" className="text-magazine-black font-bold uppercase underline">Back to Home</Link>
        </div>
    );

    const isAuthor = user && user._id === post.author?._id;

    return (
        <div className="py-20">
            <article className="magazine-container max-w-4xl">
                {/* Header */}
                <header className="mb-16 border-b-3 border-magazine-black pb-12">
                    <div className="flex justify-between items-center mb-8 uppercase text-xs font-black tracking-[0.4em]">
                        <span>{post.category || 'Lifestyle'}</span>
                        <span>{dayjs(post.createdAt).format('MMMM DD, YYYY')}</span>
                    </div>

                    <h1 className="magazine-title text-6xl md:text-8xl mb-8 leading-none">
                        {post.title}
                    </h1>

                    <div className="flex justify-between items-end">
                        <p className="font-serif italic text-2xl text-gray-600">
                            By <span className="text-magazine-black not-italic font-bold uppercase tracking-widest">{post.author?.name || 'Anonymous'}</span>
                        </p>

                        {isAuthor && (
                            <div className="flex space-x-4">
                                <Button variant="secondary" onClick={() => navigate(`/edit-post/${id}`)}>
                                    <Edit3 className="w-4 h-4" />
                                </Button>
                                <Button variant="danger" onClick={handleDeletePost}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        )}
                    </div>
                </header>

                {/* Content */}
                <div className="prose prose-xl max-w-none font-sans leading-relaxed text-gray-800 mb-24">
                    {post.content.split('\n').map((para, i) => (
                        <p key={i} className="mb-8">{para}</p>
                    ))}
                </div>

                {/* Comments Section */}
                <section className="border-t-3 border-magazine-black pt-16">
                    <h2 className="magazine-title text-4xl mb-12 flex items-center">
                        <MessageCircle className="mr-4 w-10 h-10" /> The Dialogue
                    </h2>

                    {user ? (
                        <form onSubmit={handleAddComment} className="mb-16">
                            <TextArea
                                placeholder="Join the conversation..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                required
                            />
                            <div className="flex justify-end">
                                <Button type="submit" disabled={submitting}>
                                    {submitting ? 'Posting...' : 'Post Comment'}
                                </Button>
                            </div>
                        </form>
                    ) : (
                        <div className="bg-magazine-paper border-2 border-magazine-black p-8 mb-16 text-center">
                            <p className="font-serif italic text-xl mb-4">Please log in to participate in the dialogue.</p>
                            <Link to="/login">
                                <Button variant="primary">Login Now</Button>
                            </Link>
                        </div>
                    )}

                    <div className="space-y-12">
                        {post.comments?.map((c) => (
                            <div key={c._id} className="border-b-2 border-gray-100 pb-8 last:border-0 group">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="font-bold uppercase tracking-widest text-xs">
                                        {c.author?.name} <span className="font-normal text-gray-400 ml-2 italic">— {dayjs(c.createdAt).format('MMM DD')}</span>
                                    </span>
                                    {(user && user._id === c.author?._id) && (
                                        <button
                                            onClick={() => handleDeleteComment(c._id)}
                                            className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                                <p className="font-serif text-lg leading-relaxed text-gray-700">
                                    {c.content}
                                </p>
                            </div>
                        ))}
                        {post.comments?.length === 0 && (
                            <p className="text-center font-serif italic text-gray-400 text-2xl py-8">Silence is golden. Be the first to speak.</p>
                        )}
                    </div>
                </section>
            </article>
        </div>
    );
};

export default PostDetail;
