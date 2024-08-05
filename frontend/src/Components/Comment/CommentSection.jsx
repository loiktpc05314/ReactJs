import React, { useEffect, useState } from 'react';
import { ref, onValue, set, remove, update } from 'firebase/database';
import { database } from '../../firebase/config';
import './Comment.css';
import getUsersFromLocalStorage from '../../utils/getDataUser';
import axiosConfig from '../../config/axiosConfig';
import { isLogin } from '../../Service/Auth/Api';

function CommentSection({ idArticle }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [replyToCommentId, setReplyToCommentId] = useState(null);
  const [users, setUsers] = useState({}); // State to store user information
  const idUser = getUsersFromLocalStorage()._id;

  // Fetch comments and filter by idArticle
  useEffect(() => {
    const commentsRef = ref(database, 'comments');
    onValue(commentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const commentsList = Object.keys(data)
          .map((key) => ({
            id: key,
            ...data[key],
          }))
          .filter((comment) => comment.idArticle === idArticle);
        setComments(commentsList);
      }
    });
  }, [idArticle]);

  // Fetch user data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosConfig.get('/users');
        const usersData = response.data.data;
      console.log(usersData);
      
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleAddComment = (e) => {
    e.preventDefault();
    const commentContent = newComment.trim();

    if (commentContent === '') {
      console.error('Comment cannot be empty');
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
      console.error('Comment cannot be empty');
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
        console.log('Comment deleted successfully');
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
      console.error('Reply cannot be empty');
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
          disabled={!isLogin()}
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 disabled:bg-gray-400 cursor-not-allowed"
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
        {comments?.map((comment) => {
          const user = users?.find((u) => u._id === comment?.idUser);
          const idUser = getUsersFromLocalStorage()._id;
          
     
          return (
            <article key={comment.id} className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                    <img
                      className="mr-2 w-6 h-6 rounded-full"
                      src={user && user?.avatar || 'https://i.pravatar.cc/300' }
                      alt="User"
                    />
                    {user?.username || 'User'}
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
                    <>
                    
                      <button
                        type="button"
                        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
                        onClick={() => handleEditClick(comment.id)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-700 rounded-lg ml-2 hover:bg-red-800"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-green-700 rounded-lg ml-2 hover:bg-green-800"
                        onClick={() => setReplyToCommentId(comment.id)}
                      >
                        Reply
                      </button>
                    </>
                  )}
                </div>
              </footer>
              <p>{comment.content}</p>
              {replyToCommentId === comment.id && (
                <form onSubmit={handleReply}>
                  <textarea
                    value={replyContent}
                    onChange={handleReplyChange}
                    placeholder="Write your reply..."
                    className="w-full p-2 border rounded-lg mb-2"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                  >
                    Post Reply
                  </button>
                </form>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default CommentSection;
