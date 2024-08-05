import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Image, Button, Select } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './style.css';
import CommentSection from '../Comment/CommentSection';
import axiosConfig from '../../config/axiosConfig';
import FormPosts from '../../admin/Actions/Posts/FormPosts';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';

import 'react-quill/dist/quill.snow.css';
import getUsersFromLocalStorage from '../../utils/getDataUser';
function DetailQuestion() {
	const [question, setQuestion] = useState();
	// const [value, setValue] = useState();
	const [imageFile, setImageFile] = useState(null);
	const [content, setContent] = useState('');
	const [processing, setProcessing] = useState(false);
	// const [topics, setTopics] = useState([]);
	const { id } = useParams();
	useEffect(() => {
		const getQuestion = async () => {
			const res = await axiosConfig.get(`/posts/${id}`);
			console.log(res.data.data);

			setQuestion(res.data.data);
		};
		getQuestion();
	}, [id]);
	// const handleSubmit = (event) => {
	//     event.preventDefault();
	//     // Xử lý dữ liệu ở đây
	//     console.log('Dữ liệu từ ReactQuill:', value);
	//     // Ví dụ: gửi dữ liệu tới server hoặc xử lý khác
	//   };
	const formik = useFormik({
		initialValues: {
			title: '',
			content: '',
			// topic: '',
			media: null,
		},
		validationSchema: Yup.object({
			title: Yup.string().required('Title is required'),
			content: Yup.string().required('Content is required'),
			// topic: Yup.string().required('Topic is required'),
		}),
		onSubmit: async (values, { setSubmitting }) => {
			setProcessing(true);
			try {
				const formData = new FormData();
				const idUser = getUsersFromLocalStorage()._id;

				formData.append('user', idUser);
				formData.append('title', values.title);
				formData.append('content', values.content);
				// formData.append('topic', values.topic);
				formData.append('media', imageFile);
				console.log('Submitting form data:', formData);
			
				let response;
				response = await axiosConfig.post(`/posts/replies/${id}`, formData);
				console.log(' response:', response);

				if (response.status === 201 || response.status === 200) {
					setProcessing(false);

					// setTimeout(() => navigate('/admin/posts'), 2000);
				} else {
					toast.error('Failed to add/update posts.');
				}
			} catch (error) {
				console.error('An error occurred:', error);
				if (error.response) {
					console.error('Response data:', error.response.data);
					console.error('Response status:', error.response.status);
					console.error('Response headers:', error.response.headers);
					if (error.response.data && error.response.data.message) {
						toast.error(error.response.data.message);
					} else {
						toast.error('An error occurred. Please try again.');
					}
				} else {
					toast.error('An error occurred. Please try again.');
				}
			}
			setSubmitting(false);
		},
	});

	const handleImageChange = (e) => {
		setImageFile(e.target.files[0]);
		formik.setFieldValue('media', e.target.files[0]);
	};

	// const handleChange = (value) => {
	// 	formik.setFieldValue('topic', value);
	// };

	const handleContentChange = (value) => {
		setContent(value);
		formik.setFieldValue('content', value);
	};

	return (
		<div className="pb-4 pt-4">
			<div className="pt-4 px-3">
				<div>
					<h2 className="text-xl uppercase mb-4">
						{question && question.title}
					</h2>
					<hr />
					<br />
				</div>
				<ToastContainer />
				<div className="flex flex-wrap md:flex-nowrap justify-center">
					<div className="grow pl-6 pb-8 md:border-l-[1px]">
						<img
							src={question && question.media[0].url}
							alt="Picture of the author"
							className="w-full"
						/>
						<div className="justify-center  mt-3">
							<div className="pb-5 mb-5 pl-2">
								<p
									className="mb-4"
									dangerouslySetInnerHTML={{
										__html: question && question.content,
									}}
								></p>
							{/* form Your Answer */}
								<div className="pt-4 App">
									<h2 className="text-xl uppercase mb-4 text-left">
										Your Answer
									</h2>

									<form
										onSubmit={formik.handleSubmit}
										encType="multipart/form-data"
									>
										<div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
											<div className="sm:col-span-2">
												<label
													htmlFor="title"
													className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
												>
													Title
												</label>
												<input
													type="text"
													name="title"
													id="title"
													className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
													value={formik.values.title}
													onChange={
														formik.handleChange
													}
													placeholder="Enter title"
												/>
												{formik.errors.title && (
													<p className="text-red-600 text-sm">
														{formik.errors.title}
													</p>
												)}
											</div>
											<div className="sm:col-span-2">
												<label
													htmlFor="content"
													className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
												>
													Content
												</label>
												<ReactQuill
													value={content}
													placeholder="Your content"
													onChange={
														handleContentChange
													}
													modules={{
														toolbar: [
															[
																{ font: [] },
																{ size: [] },
															],
															[
																'bold',
																'italic',
																'underline',
																'strike',
															],
															[
																{ color: [] },
																{
																	background:
																		[],
																},
															],
															[
																{
																	script: 'sub',
																},
																{
																	script: 'super',
																},
															],
															[
																'blockquote',
																'code-block',
															],
															[
																{
																	list: 'ordered',
																},
																{
																	list: 'bullet',
																},
															],
															[
																{
																	indent: '-1',
																},
																{
																	indent: '+1',
																},
																{ align: [] },
															],
															[
																'link',
																'image',
																'video',
															],
															['clean'],
														],
													}}
													className="rounded-lg"
													name="content"
													id="content"
													formats={[
														'font',
														'size',
														'bold',
														'italic',
														'underline',
														'strike',
														'color',
														'background',
														'script',
														'blockquote',
														'code-block',
														'list',
														'bullet',
														'indent',
														'align',
														'link',
														'image',
														'video',
													]}
												/>
												{formik.errors.content && (
													<p className="text-red-600 text-sm">
														{formik.errors.content}
													</p>
												)}
											</div>
											{/* <div className="sm:col-span-2">
												<label
													htmlFor="topic"
													className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
												>
													Topic
												</label>
												<Select
													value={formik.values.topic}
													style={{ width: '100%' }}
													onChange={handleChange}
													options={topics.map(
														(topic) => ({
															value: topic._id,
															label: topic.name,
														}),
													)}
												/>
												{formik.errors.topic && (
													<p className="text-red-600 text-sm">
														{formik.errors.topic}
													</p>
												)}
											</div> */}
											<div className="sm:col-span-2">
												<label
													htmlFor="media"
													className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
												>
													Image
												</label>
												<input
													type="file"
													name="media"
													id="media"
													accept="image/*"
													className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
													onChange={handleImageChange}
												/>
												{formik.errors.media && (
													<p className="text-red-600 text-sm">
														{formik.errors.media}
													</p>
												)}
											</div>
										</div>
										<div className="flex items-center space-x-4">
											<button
												type="submit"
												className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
											>
												trả lời bài post
											</button>
										</div>
									</form>
								</div>
								<div>
									<h2 className='text-2xl uppercase mb-4'>reply to post</h2>
									<div>
									{question && question.reply.map((item , index)=>{
										console.log(item.media[0].url);
										
										return (
											<div key={index}>
												<h2 className='text-xl uppercase mb-4'> Title: {item.title}</h2>
												<img
													src={item && item.media[0].url}
													alt="Picture of the author"
													className="w-full"
												/>
											<p
									className="mb-4"
									dangerouslySetInnerHTML={{
										__html: item && item.content,
									}}
								></p>
											</div>
										)
									})}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="flex-none w-[272px] md:block px-3">
						<h4 className="text-xl mb-4">Hot Network Questions</h4>
						<div>
							<div className="ml-6 mb-3 text-xs hover:text-blue-500">
								<Link to="">
									How to output the correlation/euclidian
									value for the dendogram in pheatmap R?
								</Link>
							</div>
							<hr />
							<div className="ml-6 mb-3 text-xs hover:text-blue-500">
								<Link to="">
									How to output the correlation/euclidian
									value for the dendogram in pheatmap R?
								</Link>
							</div>
							<hr />
							<div className="ml-6 mb-3 text-xs hover:text-blue-500">
								<Link to="">
									How to output the correlation/euclidian
									value for the dendogram in pheatmap R?
								</Link>
							</div>
							<hr />
						</div>
					</div>
				</div>
			</div>
			<CommentSection idArticle={id} />
		</div>
	);
}

export default DetailQuestion;
