import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const PostCard = ({ post }) => {
    return (
        <article className="group cursor-pointer border-magazine-black border-2 h-full flex flex-col hover:bg-magazine-black transition-all duration-500">
            <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] bg-magazine-black text-magazine-white px-2 py-1 group-hover:bg-magazine-white group-hover:text-magazine-black transition-all">
                        {post.category || 'Lifestyle'}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-gray-300">
                        {dayjs(post.createdAt).format('MMM DD, YYYY')}
                    </span>
                </div>

                <h3 className="font-serif text-3xl mb-4 leading-tight group-hover:text-magazine-white transition-all">
                    {post.title}
                </h3>

                <p className="text-sm text-gray-600 mb-8 line-clamp-3 group-hover:text-gray-300 transition-all font-light leading-relaxed">
                    {post.content.substring(0, 150)}...
                </p>

                <div className="mt-auto">
                    <Link
                        to={`/posts/${post._id}`}
                        className="text-xs font-bold uppercase tracking-[0.2em] group-hover:text-magazine-white group-hover:underline underline-offset-4 transition-all"
                    >
                        Read More →
                    </Link>
                </div>
            </div>

            <div className="h-2 bg-magazine-black border-t-2 border-magazine-black group-hover:bg-magazine-white transition-all"></div>
        </article>
    );
};

export default PostCard;
