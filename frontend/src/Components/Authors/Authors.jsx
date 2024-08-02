import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosConfig from '../../config/axiosConfig';

const Authors = () => {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await axiosConfig('/users'); 
             
             
                    setAuthors(response.data.data);
					
					
             
            } catch (error) {
                console.error('Error fetching authors:', error);
            }
        };

        fetchAuthors();
    }, []);

    return (
        <div className="grid grid-cols-4 gap-4 p-4">
            {authors &&
                authors.map((author) => (
                    <div className=" " key={author._id}>
                        <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                            <div className="border-b px-4 pb-6">
                                <div className="text-center my-4">
                                    <img
                                        className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
                                        src={author.avatar || 'https://via.placeholder.com/150'}
                                        alt={author.username}
                                    />
                                    <div className="py-2">
                                        <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">
                                            {author.username || 'Unknown'}
                                        </h3>
                                    </div>
                                </div>
                                <div className="flex justify-center px-2">
                                    <Link to={`/author/${author._id}`}>
                                        <button className="flex-1 rounded-full border-2 border-gray-400 dark:border-gray-700 font-semibold text-black dark:text-white px-4 py-2">
                                            Xem chi tiết
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            <div className="px-4 py-4">
                                <div className="flex gap-2 items-center text-gray-800 dark:text-gray-300 mb-4">
                                    <img
                                        width="25"
                                        height="25"
                                        src="https://img.icons8.com/ios/50/book--v1.png"
                                        alt="book icon"
                                    />
                                    <span>
                                        <strong className="text-black dark:text-white">
                                            {author.posts.length || 0}
                                        </strong>{' '}
                                        Đã xuất bản
                                    </span>
                                </div>
                              
                            </div>
                        </div>
                    </div>
				))}
        </div>
    );
};

export default Authors;
