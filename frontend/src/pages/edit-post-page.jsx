import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/http-client';
import { Input, TextArea, Button, SectionTitle } from '../components/base-ui';

const EditPost = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: ''
    });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data } = await api.get(`/posts/${id}`);
                setFormData({
                    title: data.title,
                    content: data.content,
                    category: data.category || ''
                });
            } catch (err) {
                setError('Failed to load the archives.');
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await api.put(`/posts/${id}`, formData);
            navigate(`/posts/${id}`);
        } catch (err) {
            setError('Failed to update the masterpiece.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return (
        <div className="flex justify-center py-20">
            <div className="animate-spin h-12 w-12 border-b-3 border-magazine-black rounded-full"></div>
        </div>
    );

    return (
        <div className="py-20">
            <div className="magazine-container max-w-3xl">
                <SectionTitle subtitle="Refine your thoughts and updates">Edit Archives</SectionTitle>

                <form onSubmit={handleSubmit} className="border-3 border-magazine-black p-12 bg-white">
                    <Input
                        label="Post Title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="text-3xl font-serif"
                    />


                    <Input
                        label="Category"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    />

                    <TextArea
                        label="Article Content"
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    />

                    {error && <p className="text-red-500 text-[10px] font-bold uppercase mb-8">{error}</p>}

                    <div className="flex justify-end space-x-6">
                        <Button variant="ghost" type="button" onClick={() => navigate(-1)}>Cancel</Button>
                        <Button type="submit" disabled={submitting}>
                            {submitting ? 'Updating...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPost;
