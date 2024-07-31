import React, { useEffect, useState } from 'react';
import { ref, onValue, set, remove, update } from 'firebase/database';
import { database } from '../../firebase/config';
import './Comment.css';

function CommentSection() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
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

  const handleAddComment = (e) => {
    e.preventDefault();
    const commentContent = newComment.trim();

    if (commentContent === '') {
      alert('Comment cannot be empty');
      return;
    }

    const newCommentRef = ref(database, `comments/${Date.now()}`);
    set(newCommentRef, {
      content: commentContent,
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

  const handleEditClick = (commentId) => {
    const comment = comments.find(c => c.id === commentId);
    if (comment) {
      setNewComment(comment.content);
      setEditingCommentId(commentId);
    }
  };

  const handleUpdateComment = (e) => {
    e.preventDefault();
    const updatedContent = newComment.trim();

    if (updatedContent === '') {
      alert('Comment cannot be empty');
      return;
    }

    update(ref(database, `comments/${editingCommentId}`), {
      content: updatedContent,
    })
      .then(() => {
        setEditingCommentId(null);
        setNewComment('');
      })
      .catch((error) => {
        console.error('Error updating comment: ', error);
      });
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setNewComment('');
  };

  const handleDeleteComment = (commentId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this comment?');
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
            ...(comments.find((comment) => comment.id === replyToCommentId)?.replies || []),
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
        <form className="mb-6" onSubmit={editingCommentId ? handleUpdateComment : handleAddComment}>
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment..."
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            {editingCommentId ? 'Update comment' : 'Post comment'}
          </button>
          {editingCommentId && (
            <button
              type="button"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-gray-700 rounded-lg ml-2 hover:bg-gray-800"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          )}
        </form>
        {comments.map((comment) => (
          <article key={comment.id} className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
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
                  <time dateTime="2022-03-12" title="March 12th, 2022">
                    {new Date(comment.timestamp).toLocaleDateString()}
                  </time>
                </p>
              </div>
              <div>
                {editingCommentId === comment.id ? (
                  <form onSubmit={handleUpdateComment}>
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Edit your comment..."
                      className="w-full p-2 border rounded-lg mb-2"
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-gray-700 rounded-lg ml-2 hover:bg-gray-800"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <div>
                    <button
                      type="button"
                      className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700"
                      onClick={() => setReplyToCommentId(comment.id)}
                    >
                      Reply
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-yellow-700 rounded-lg hover:bg-yellow-800 dark:bg-yellow-600 dark:hover:bg-yellow-700"
                      onClick={() => handleEditClick(comment.id)}
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            </footer>
            {replyToCommentId === comment.id && (
              <form onSubmit={handleReply}>
                <textarea
                  value={replyContent}
                  onChange={handleReplyChange}
                  placeholder="Write a reply..."
                  className="w-full p-2 border rounded-lg mb-2"
                />
                <button
                  type="submit"
                  className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                >
                  Reply
                </button>
              </form>
            )}
            <div className="text-gray-500 dark:text-gray-400">
              {comment.content}
            </div>
            {comment.replies &&
              comment.replies.map((replyId) => {
                const reply = comments.find(c => c.id === replyId);
                return reply ? (
                  <article
                    style={{ marginLeft: '40px' }}
                    key={reply.id}
                    className="p-4 mb-4 text-base bg-gray-100 rounded-lg dark:bg-gray-800"
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
                          <time dateTime="2022-03-12" title="March 12th, 2022">
                            {new Date(reply.timestamp).toLocaleDateString()}
                          </time>
                        </p>
                      </div>
                    </footer>
                    <div className="text-gray-500 dark:text-gray-400">
                      {reply.content}
                    </div>
                  </article>
                ) : null;
              })}
          </article>
        ))}
      </div>
    </section>
  );
}

export default CommentSection;
