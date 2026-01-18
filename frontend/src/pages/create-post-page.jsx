import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/http-client';
import { Input, TextArea, Button, SectionTitle } from '../components/base-ui';

const CreatePost = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.content) {
            setError('Title and content are required archives.');
            return;
        }

        setLoading(true);
        try {
            const { data } = await api.post('/posts', formData);
            navigate(`/posts/${data._id}`);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to publish the masterpiece.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="py-20">
            <div className="magazine-container max-w-3xl">
                <SectionTitle subtitle="Share your unique perspective with the world">Create New Masterpiece</SectionTitle>

                <form onSubmit={handleSubmit} className="border-3 border-magazine-black p-12 bg-white">
                    <Input
                        label="Post Title"
                        placeholder="The art of Greek mythology..."
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="text-3xl font-serif"
                    />


                    <Input
                        label="Category"
                        placeholder="Lifestyle, Fashion, Tech..."
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    />

                    <TextArea
                        label="Article Content"
                        placeholder="Write your story here..."
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    />

                    {error && <p className="text-red-500 text-[10px] font-bold uppercase mb-8">{error}</p>}

                    <div className="flex justify-end space-x-6">
                        <Button variant="ghost" type="button" onClick={() => navigate(-1)}>Discard</Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Publishing...' : 'Publish Masterpiece'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;
