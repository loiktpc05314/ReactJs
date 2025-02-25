import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from '../../config/axiosConfig';
const Register = () => {
	const [imageFile, setImageFile] = useState(null);
	const navigate = useNavigate();
	const formik = useFormik({
		initialValues: {
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		validationSchema: Yup.object({
			username: Yup.string()
				.required('Tên không được trống')
				.min(4, 'Tên ít nhất có 4 kí tự'),
			email: Yup.string()
				.required('Email không được trống')
				.matches(
					/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
					'Vui lòng nhập đúng định dạng email',
				),
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
			try {
				const requestData = new FormData();
				requestData.append('username', values.username);
				requestData.append('email', values.email);
				requestData.append('password', values.password);
				
				if (imageFile !== null) {
					requestData.append('avatar', imageFile);
				}
		
				console.log(requestData);
				const response = await axios.post(
					'/auth/register',
					requestData,
					{
						headers: {
							'Content-Type': 'multipart/form-data', 
						},
					}
				);
		
				if (response.status === 200) {
					navigate('/login');
				} else {
					console.error('Đăng ký không thành công.');
				}
			} catch (error) {
				console.error('Đã xảy ra lỗi:', error.message);
			}
			setSubmitting(false);
		},
		
	});
	const handleImageChange = (e) => {
		setImageFile(e.target.files[0]);
	};
	return (
		<section>
			<div className="relative flex flex-col text-gray-700 bg-transparent shadow-md p-4 mt-2 rounded-xl bg-clip-border">
				<h4 className="text-center block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
					Đăng kí
				</h4>

				<form
					className="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96"
					onSubmit={formik.handleSubmit}
					encType="multipart/form-data"
					method="post"
				>
					<div className="mb-4">
						<label
							htmlFor="avatar"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Ảnh
						</label>
						<input
							type="file"
							id="avatar"
							name="avatar"
							accept="image/*"
							onChange={handleImageChange}
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
						/>
					</div>
					<div className="flex flex-col gap-6 mb-1">
						<h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
							Tên đăng kí
						</h6>
						<div className="relative h-11 w-full min-w-[200px]">
							<input
								type="text"
								placeholder="Nhập tên đăng kí"
								id="username"
								name="username"
								value={formik.values.username}
								onChange={formik.handleChange}
								className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
							/>
							{formik.errors.username && (
								<p className="text-red-600 text-sm">
									{formik.errors.username}
								</p>
							)}
							<label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
						</div>
						<h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
							Email
						</h6>
						<div className="relative h-11 w-full min-w-[200px]">
							<input
								type="text"
								placeholder="Nhập email"
								id="email"
								name="email"
								value={formik.values.email}
								onChange={formik.handleChange}
								className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
							/>
							{formik.errors.email && (
								<p className="text-red-600 text-sm">
									{formik.errors.email}
								</p>
							)}
							<label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
						</div>

						<h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
							Mật khẩu
						</h6>
						<div className="relative h-11 w-full min-w-[200px]">
							<input
								type="password"
								id="password"
								name="password"
								placeholder="Nhập mật khẩu"
								value={formik.values.password}
								onChange={formik.handleChange}
								className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
							/>
							{formik.errors.password && (
								<p className="text-red-600 text-sm">
									{formik.errors.password}
								</p>
							)}
							<label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
						</div>
						<h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
							Xác nhận mật khẩu
						</h6>
						<div className="relative h-11 w-full min-w-[200px]">
							<input
								type="password"
								placeholder="Nhập xác nhận mật khẩu"
								id="confirmPassword"
								name="confirmPassword"
								value={formik.values.confirmPassword}
								onChange={formik.handleChange}
								className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
							/>
							{formik.errors.confirmPassword && (
								<p className="text-red-600 text-sm">
									{formik.errors.confirmPassword}
								</p>
							)}
							<label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
						</div>
					</div>
					<div className="inline-flex items-center mt-2">
						<label
							className="relative -ml-2.5 flex cursor-pointer items-center rounded-full p-3"
							htmlFor="remember"
						>
							<input
								type="checkbox"
								className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
								id="remember"
							/>
							<span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-3.5 w-3.5"
									viewBox="0 0 20 20"
									fill="currentColor"
									stroke="currentColor"
									strokeWidth="1"
								>
									<path
										fillRule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clipRule="evenodd"
									></path>
								</svg>
							</span>
						</label>
						<label
							className="mt-px font-light text-gray-700 cursor-pointer select-none"
							htmlFor="remember"
						>
							<p className="flex items-center font-sans text-sm antialiased font-normal leading-normal text-gray-700">
								Tôi đồng ý
								<a
									href="#"
									className="font-medium transition-colors hover:text-gray-900"
								>
									&nbsp;với các điều khoản
								</a>
							</p>
						</label>
					</div>
					<button
						className="mt-6 block w-full select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
						type="submit"
					>
						Đăng kí
					</button>
					<p className="block mt-4 font-sans text-base antialiased font-normal leading-relaxed text-center text-gray-700">
						Bạn đã có tài khoản?
						<Link to={'/login'}>
							<a className="font-medium text-gray-900">
								Đăng nhập
							</a>
						</Link>
					</p>
				</form>
			</div>
		</section>
	);
};

export default Register;
