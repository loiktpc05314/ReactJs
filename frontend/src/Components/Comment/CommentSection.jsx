import React, { useEffect, useState } from 'react';
import { ref, onValue, set, remove, update } from 'firebase/database';
import { database } from '../../firebase/config';

function CommentSection() {
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState('');
	const [editingCommentId, setEditingCommentId] = useState(null);
	const [editingCommentContent, setEditingCommentContent] = useState('');
	const [replyContent, setReplyContent] = useState('');
	const [replyToCommentId, setReplyToCommentId] = useState(null);

	const idArticle = 'article123';
	const idUser = 'user123';

	useEffect(() => {
		const commentsRef = ref(database, 'comments');
		onValue(commentsRef, (snapshot) => {
			const data = snapshot.val();
			if (data) {
				const commentsList = Object.keys(data).map((key) => ({
					id: key,
					...data[key],
				}));
				setComments(commentsList);
			}
		});
	}, []);

	const handleCommentChange = (e) => {
		setNewComment(e.target.value);
	};
	const handleAddComment = (e) => {
		e.preventDefault();
		if (newComment.trim() === '') {
			alert('Comment cannot be empty');
			return;
		}
		const newCommentRef = ref(database, `comments/${Date.now()}`);
		set(newCommentRef, {
			content: newComment,
			parentId: null,
			replies: [],
			idArticle: idArticle,
			idUser: idUser,
			timestamp: Date.now(),
		})
			.then(() => {
				setNewComment('');
			})
			.catch((error) => {
				console.error('Error adding comment: ', error);
			});
	};

	const handleEditClick = (commentId, content) => {
		setEditingCommentId(commentId);
		setEditingCommentContent(content);
	};

	const handleUpdateComment = (commentId) => {
		update(ref(database, `comments/${commentId}`), {
			content: editingCommentContent,
		})
			.then(() => {
				setEditingCommentId(null);
				setEditingCommentContent('');
			})
			.catch((error) => {
				console.error('Error updating comment: ', error);
			});
	};

	const handleDeleteComment = (commentId) => {
		const isConfirmed = window.confirm(
			'Are you sure you want to delete this comment?',
		);
		if (!isConfirmed) {
			return;
		}
		remove(ref(database, `comments/${commentId}`))
			.then(() => {
				alert('Comment deleted successfully');
			})
			.catch((error) => {
				console.error('Error deleting comment: ', error);
				alert('Failed to delete comment. Please try again.');
			});
	};

	const handleReplyChange = (e) => {
		setReplyContent(e.target.value);
	};

	const handleReply = (e) => {
		e.preventDefault();
		if (replyContent.trim() === '') {
			alert('Reply cannot be empty');
			return;
		}
		const replyId = Date.now();
		const replyRef = ref(database, `comments/${replyId}`);
		const commentRef = ref(database, `comments/${replyToCommentId}`);

		set(replyRef, {
			content: replyContent,
			parentId: replyToCommentId,
			replies: [],
			idArticle: idArticle,
			idUser: idUser,
			timestamp: Date.now(),
		})
			.then(() => {
				update(commentRef, {
					replies: [
						...(comments.find(
							(comment) => comment.id === replyToCommentId,
						)?.replies || []),
						replyId,
					],
				});
				setReplyContent('');
				setReplyToCommentId(null);
			})
			.catch((error) => {
				console.error('Error replying to comment: ', error);
			});
	};

	return (
		<section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
			<div className="max-w-2xl mx-auto px-4">
				<form className="mb-6" onSubmit={handleAddComment}>
					<div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
						<label htmlFor="comment" className="sr-only">
							Your comment
						</label>
						<textarea
							id="comment"
							rows={6}
							className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
							placeholder="Write a comment..."
							required
							value={newComment}
							onChange={handleCommentChange}
						/>
					</div>
					<button
						type="submit"
						className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
					>
						Post comment
					</button>
				</form>
				{ comments.map((comment) => (
                   
					<article
						key={comment.id}
						className="p-6 text-base bg-white rounded-lg dark:bg-gray-900"
					>
						<footer className="flex justify-between items-center mb-2">
							<div className="flex items-center">
								<p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
									<img
										className="mr-2 w-6 h-6 rounded-full"
										src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
										alt="User"
									/>
									User
								</p>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									<time
										pubdate
										dateTime={new Date(
											comment.timestamp,
										).toISOString()}
										title={new Date(
											comment.timestamp,
										).toDateString()}
									>
										{new Date(
											comment.timestamp,
										).toDateString()}
									</time>
								</p>
							</div>
							<div>
								{editingCommentId === comment.id ? (
									<>
										<textarea
											value={editingCommentContent}
											onChange={(e) =>
												setEditingCommentContent(
													e.target.value,
												)
											}
										/>
										<button
											onClick={() =>
												handleUpdateComment(comment.id)
											}
										>
											Update
										</button>
										<button
											onClick={() =>
												setEditingCommentId(null)
											}
										>
											Cancel
										</button>
									</>
								) : (
									<>
										<button
											onClick={() =>
												handleEditClick(
													comment.id,
													comment.content,
												)
											}
											className="text-blue-500 hover:underline dark:text-blue-400"
										>
											Edit
										</button>
										<button
											onClick={() =>
												handleDeleteComment(comment.id)
											}
											className="text-red-500 hover:underline dark:text-red-400"
										>
											Delete
										</button>
										<button
											onClick={() =>
												setReplyToCommentId(comment.id)
											}
											className="text-green-500 hover:underline dark:text-green-400"
										>
											Reply
										</button>
									</>
								)}
							</div>
						</footer>
						{replyToCommentId === comment.id && (
							<form onSubmit={handleReply}>
								<textarea
									value={replyContent}
									onChange={handleReplyChange}
									placeholder="Write a reply..."
								/>
								<button
									type="submit"
									className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
								>
									Reply
								</button>
							</form>
						)}
						{comment.replies &&
							Object.keys(comments).forEach(replyId => {
                                if (comment.replies.includes(parseInt(replyId))) {
                                    const reply = comments[replyId];
								return reply ? (
									<article
                                    style={{marginLeft: '40px'}}
										key={reply.id}
										className=" p-6 text-base  rounded-lg dark:bg-gray-800"
									>
										<footer className="flex justify-between items-center mb-2">
											<div className="flex items-center">
												<p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
													<img
														className="mr-2 w-6 h-6 rounded-full"
														src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
														alt="User"
													/>
													User
												</p>
												<p className="text-sm text-gray-600 dark:text-gray-400">
													<time
														pubdate
														dateTime={new Date(
															reply.timestamp,
														).toISOString()}
														title={new Date(
															reply.timestamp,
														).toDateString()}
													>
														{new Date(
															reply.timestamp,
														).toDateString()}
													</time>
												</p>
											</div>
										</footer>
										<p className="text-gray-500 dark:text-gray-400">
											{reply.content}
										</p>
									</article>
								) : null;
							}})}
						<p className="text-gray-500 dark:text-gray-400">
							{comment.content}
						</p>
					</article>
				))}
			</div>
		</section>
	);
}

export default CommentSection;
