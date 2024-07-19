import { useForm } from 'react-hook-form';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState } from 'react';

export default function Ask() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const onSubmit = (data) => console.log(data);
	console.log(errors);
	const [editorData, setEditorData] = useState('');

	return (
		<>
			<div className="border border-gray-200 p-6">
                <h2 className='text-2xl font-bold mb-3'>
                Ask a public question
                </h2>
				<div>
					<form className="" onSubmit={handleSubmit(onSubmit)}>
						<div className="mb-3">
							<label className='mb-2' htmlFor="">Title</label>
							<input
								type="text"
								placeholder="Title"
								className="rounded-xl w-full"
								{...register('Title', { required: true })}
							/>
						</div>
						
						<div className="mb-3">
							<label  className='mb-2' htmlFor="">Content</label>
							<CKEditor
								editor={ClassicEditor}
								data={editorData}
								onChange={(event, editor) => {
									const data = editor.getData();
									setEditorData(data);
									console.log({ event, editor, data });
								}}
								
							/>
						</div>
						<div className="mb-3">
							<label className='mb-2' htmlFor="">Tags</label>
							<input
								type="text"
								placeholder="Tags"
								className="rounded-xl w-full"
								{...register('Tags', { required: true })}
							/>
						</div>
						<button
							type="button"
							className="text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
						>
							xác nhận
						</button>
					</form>
				</div>
			</div>
		</>
	);
}
