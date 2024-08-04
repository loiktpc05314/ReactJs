/* eslint-disable no-mixed-spaces-and-tabs */
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../../admin/Components/Loading/Loading';
import axiosConfig from '../../config/axiosConfig';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { getinfouser } from '../../Service/Auth/Api';

function Changepass() {
	const { id } = useParams();
	const navigate = useNavigate();

	const [processing, setProcessing] = useState(false);
	useEffect( () => {
		const fetchData = async () => {
            if (id) {
                try {
                   
					const res = await  getinfouser(id)

                    formik.setValues({
                        username: res.username,
                        email: res.email,
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
			username: '' ,
			email: '',
			avatar: null,
			role: 'user',
			password: '',
		},
		validationSchema: Yup.object({
			password: Yup.string()
				.required('Mật khẩu không được trống')
				.matches(
					/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
					'Mật khẩu ít nhất phải là 8 kí tự',
				),
			confirmPassword: Yup.string()
				.required('Xác nhận mật khẩu không được trống')
				.oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp'),
		}),
		onSubmit: async (values, { setSubmitting }) => {
			setProcessing(true);
			try {
				const formData = new FormData();

				if (values.password) {
					formData.append('password', values.password);
				}
				formData.append('username', values.username);
                formData.append('email', values.email);

				let response = await axiosConfig.put(`/users/${id}`, formData);

				console.log('API response:', response);

				if (response.status === 201 || response.status === 200) {
					setProcessing(false);
					const message = 'Người dùng cập nhật mật khẩu thành công';
					toast.success(message);
					setTimeout(() => navigate('/user/null'), 2000);
				} else {
					toast.error('Failed to add/update user.');
				}
			} catch (error) {
				console.error('An error occurred:', error);
				if (
					error.response &&
					error.response.data &&
					error.response.data.message
				) {
					toast.error(error.response.data.message);
				} else {
					toast.error('An error occurred. Please try again.');
				}
			}
			setSubmitting(false);
		},
	});
	
	

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
				<div className="text-center">
					<h2 className="font-bold text-xl uppercase">
						thay đổi thông tin tài khoản
					</h2>
				</div>
				<section className="bg-white dark:bg-gray-900">
					{processing && <Loading />}
					<div className="max-w-2xl px-4 py-4 mx-auto lg:py-4">
						<ToastContainer />
						<form
							onSubmit={formik.handleSubmit}
							encType="multipart/form-data"
						>
							  <input
                                type="hidden"
                                name="username"
                                id="username"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                placeholder="Enter username"
                            />
							 <input
                                type="hidden"
                                name="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                placeholder="Enter email"
                            /> 
							<div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
								<div className="sm:col-span-2">
									<label
										htmlFor="password"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										nhập mật khẩu mới
									</label>
									<input
										type="password"
										name="password"
										id="password"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
										// value={formik.values.password}
										onChange={formik.handleChange}
										placeholder="Enter your new password"
									/>
									{formik.errors.password && (
										<p className="text-red-600 text-sm">
											{formik.errors.password}
										</p>
									)}
								</div>
								<div className="sm:col-span-2">
									<label
										htmlFor="password"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										xác nhận mật khẩu mới
									</label>
									<input
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
										type="password"
										placeholder="Nhập xác nhận mật khẩu"
										id="confirmPassword"
										name="confirmPassword"
										value={formik.values.confirmPassword}
										onChange={formik.handleChange}
									/>
									{formik.errors.confirmPassword && (
										<p className="text-red-600 text-sm">
											{formik.errors.confirmPassword}
										</p>
									)}
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
					onClick={() => {
						navigate('/user/null');
					}}
				>
					Quay lại
				</button>
			</div>
		</div>
	);
}

export default Changepass;
