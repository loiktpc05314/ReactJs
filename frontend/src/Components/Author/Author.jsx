import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../../config/axiosConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';

function Author() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [follow, setFollow] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`/users/${id}`);
                setUser(response.data.data);

                const currentUser = localStorage.getItem('user');
                const useId = JSON.parse(currentUser)[0];
                const responseUser = await axios.get(`/user/${useId}`);
                const hasFollowIds = responseUser.data.hasFollow;

                if (hasFollowIds.includes(id)) {
                    setFollow(true);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchUser();
    }, [id]);



    return (
        <div className="bg-gray-100">
            <div className="container mx-auto py-8">
                {user && (
                    <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                        <div className="col-span-4 sm:col-span-3">
                            <div className="bg-white shadow rounded-lg p-6">
                                <div className="flex flex-col items-center">
                                    <img
                                        src={user.avatar}
                                        className="w-32 h-32 bg-gray-300 rounded-full mb-4"
                                        alt="User Avatar"
                                    />
                                    <h1 className="text-xl font-bold">{user.username}</h1>
                                    <p className="text-gray-700">{user.email}</p>
                                    <div className="mt-6 flex flex-wrap gap-4 justify-center">
                                       
                                    </div>
                                </div>
                                <div className="flex flex-col mt-3">
                                    <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
                                        Thông tin
                                    </span>
                                    <ul>
                                        <li className='text-balance'>Username: {user.username}</li>
                                        <li className='text-balance'>Email: {user.email}</li>
                                        <li className='text-balance'>Số bài viết: {user.posts && user.posts.length}</li>
                                        
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-4 sm:col-span-9">
                            <div className="bg-white shadow rounded-lg p-6">
                                <h2 className="text-xl font-medium mt-3 mb-4">
                                    Bài viết của{' '}
                                    <span className="text-xl font-bold">
                                        {user.username}
                                    </span>
                                </h2>
                                <div className="grid grid-cols-3 gap-4">
                                    {user.posts && user.posts.length > 0 ? (
                                        user.articles.map((article, index) => (
                                            <div
                                                key={index}
                                                className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-72"
                                            >
                                                <div className="p-5">
                                                    <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                                        {article.title}
                                                    </h5>
                                                    <Link to={`/article/${article._id}`}>
                                                        <button
                                                            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                                            type="button"
                                                        >
                                                            Đọc thêm
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-700">Chưa có bài viết nào.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Author;
