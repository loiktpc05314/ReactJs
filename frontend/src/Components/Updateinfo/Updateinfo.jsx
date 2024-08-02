import  { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom'
import Loading from '../../admin/Components/Loading/Loading';
import axiosConfig from '../../config/axiosConfig';
import { getinfouser } from '../../Service/Auth/Api';

function Updateinfo() {
    const { id } = useParams();
    // const isEditForm = Boolean(id);
    const navigate = useNavigate();
    const [imageFile, setImageFile] = useState(null);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                try {
                    const res = await  getinfouser(id)
                    
                    formik.setValues({
                        username: res.username,
                        email: res.email,
                        role: res.role === 'admin' ? true : false,
                    });
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        fetchData();
    }, [id]);

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            avatar: null,
            role: false,
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            setProcessing(true);
            try {
                const formData = new FormData();
                formData.append('username', values.username);
              
                formData.append('email', values.email);
                formData.append('avatar', imageFile);
                formData.append('role', values.role ? 'admin' : 'user');

                console.log('Submitting form data:', values);

                 
                let  response = await axiosConfig.put(`/users/${id}`, formData);
               

                console.log('API response:', response);

                if (response.status === 201 || response.status === 200) {
                    setProcessing(false);
                    const message = 'Người dùng cập nhật thành công' 
                    toast.success(message);
                    setTimeout(()=>navigate('/user/null'),2000);
                } else {
                    toast.error('Failed to add/update user.');
                }
            } catch (error) {
                console.error('An error occurred:', error);
                if (error.response && error.response.data && error.response.data.message) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error('An error occurred. Please try again.');
                }
            }
            setSubmitting(false);
        },
    });

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
        formik.setFieldValue('avatar', e.target.files[0]);
    };
	return (
		<div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto  bg-white shadow-xl rounded-lg text-gray-900">
			<div className="rounded-t-lg h-32 overflow-hidden">
				<img
					className="object-cover object-top w-full"
					src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
					alt="Mountain"
				/>
			</div>
			
			<div className=" mt-2">
				<div  className='text-center'>
                <h2 className='font-bold text-xl uppercase'>thay đổi thông tin tài khoản</h2>
                </div>
                <section className="bg-white dark:bg-gray-900">
            {processing && <Loading />}
            <div className="max-w-2xl px-4 py-4 mx-auto lg:py-4">
             
                <ToastContainer />
                <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                    <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                        <div className="sm:col-span-2">
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên tài khoản</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                placeholder="Enter username"
                            />
                            {formik.errors.username && <p className="text-red-600 text-sm">{formik.errors.username}</p>}
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                placeholder="Enter email"
                            />
                            {formik.errors.email && <p className="text-red-600 text-sm">{formik.errors.email}</p>}
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="avatar" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Avatar</label>
                            <input
                                type="file"
                                id="avatar"
                                name="avatar"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            />
                        </div>
                      
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            type="submit"
                            className="text-white justify-end flex bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                            xác nhận
                        </button>
                    </div>
                </form>
            </div>
        </section>
			</div>
			
			<div className="p-4 border-t mx-8 mt-2">
			<button
						className="w-auto block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2"
						onClick={()=>{
                            navigate('/user/null')
                        }}
					>
						Quay lại
					</button>
			</div>
		</div>
	);
}

export default Updateinfo;
