import React, { useEffect, useState } from 'react';
import axios from '../../../config/axiosConfig';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import ConfirmationModal from '../../Components/ConfirmationModal/ConfirmationModal';

function ReadPosts() {
    const [posts, setPosts] = useState([]);
    const [selected, setSelected] = useState(null);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get('/posts');
                setPosts(res.data.data);
            } catch (error) {
                console.error('Error fetching posts data:', error);
            }
        }
        
        fetchData();
    }, [isConfirmationOpen]);
    const handleDelete = (posts) => {
        setSelected(posts);
        setIsConfirmationOpen(true);
    };
    const handleCloseConfirmation = () => {
        setSelected(null);
        setIsConfirmationOpen(false);
    };

    const handleConfirmDelete = async () => {
        if (!selected) return;
        try {
            await axios.delete(`/posts/${selected._id}`);
            toast.success('Posts deleted successfully');

            handleCloseConfirmation();
        } catch (error) {
            console.error('Error deleting posts:', error);
        }
    };

    return (
        <section>
            <Link to={'/admin/add-posts'}>
                <button
                    type="button"
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                    Add Posts
                </button>
            </Link>
            <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
                <table className="w-full text-left table-auto min-w-max">
                    <thead>
                        <tr>
                            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                    #
                                </p>
                            </th>
                            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                    Title
                                </p>
                            </th>
                            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                   Content
                                </p>
                            </th>
                            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                   Date
                                </p>
                            </th>
                            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                    Hành động
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((posts, index) => (
                            <tr key={index}>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                        {index + 1}
                                    </p>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                    {posts?.title?.length > 20 ? `${posts.title.substring(0, 30)}...` : posts.title}
                                    </p>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                        {posts?.content?.length > 20 ? `${posts.content.substring(0, 20)}...` : posts.content}
                                    </p>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                        {posts?.date}
                                    </p>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    {posts.user && (<Link to={`/admin/edit-posts/${posts?._id}`}>
                                        <button
                                            type="button"
                                            className="text-white bg-blue-700 text-xs font-medium hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg px-2 py-2 me-1 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                        >
                                            <FontAwesomeIcon icon={faPenToSquare}/>
                                        </button>
                                    </Link>)}
                                    
                                    <button
                                        onClick={() => handleDelete(posts)}
                                        className="text-white bg-red-700 text-xs font-medium hover:bg-red-800 focus:ring-4 focus:ring-red-300 rounded-lg px-2 py-2 me-1 mb-2"
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>

                                    <ConfirmationModal
                                        isOpen={isConfirmationOpen}
                                        onClose={handleCloseConfirmation}
                                        onConfirm={handleConfirmDelete}
                                        title="Confirm Delete Posts"
                                        content={`Are you sure you want to delete the Posts "${selected?.title}"?`}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </section>
    );
}

export default ReadPosts;
