import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Image, Button ,Modal,Select} from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './style.css';
import CommentSection from '../Comment/CommentSection';
import axiosConfig from '../../config/axiosConfig';
import Report from '../Report/Report';

function DetailQuestion() {
	const [question, setQuestion] = useState();
	const [value, setValue] = useState();
    const {id}=useParams();
	
useEffect(()=>{
    const getQuestion=async()=>{
        const res=await axiosConfig.get(`/posts/${id}`)
        console.log(res.data.data);
        
        setQuestion(res.data.data)
    }
    getQuestion()
},[id])
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

				<div className="flex flex-wrap md:flex-nowrap justify-center">
					<div className="grow pl-6 pb-8 md:border-l-[1px]">
						<img
							src={question && question.media[0].url}
							alt="Picture of the author"
							className="w-full"
						/>
						<div className="justify-center  mt-3">
						
							<div className="pb-5 mb-5 pl-2">
								<p className="mb-4" dangerouslySetInnerHTML={{ __html: question && question.content }}>
								
								</p>
								<div>
								<Report />
								</div>
								<div className="pt-4 App">
									<h2 className="text-xl uppercase mb-4 text-left">
										Your Answer
									</h2>
									<ReactQuill
										value={value}
										onChange={setValue}
										modules={{
											toolbar: [
												[{ font: [] }, { size: [] }],
												[
													'bold',
													'italic',
													'underline',
													'strike',
												],
												[
													{ color: [] },
													{ background: [] },
												],
												[
													{ script: 'sub' },
													{ script: 'super' },
												],
												['blockquote', 'code-block'],
												[
													{ list: 'ordered' },
													{ list: 'bullet' },
												],
												[
													{ indent: '-1' },
													{ indent: '+1' },
													{ align: [] },
												],
												['link', 'image', 'video'],
												['clean'],
											],
										}}
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
									<div className="pt-4 text-left">
										<Button
											type="submit"
											className="bg-blue-600 text-white h-10"
										>
											Post Your Answer
										</Button>
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
			<CommentSection idArticle={id}/>
		</div>
	);
}

export default DetailQuestion;
