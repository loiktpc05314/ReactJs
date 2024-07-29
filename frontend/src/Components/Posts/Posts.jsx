import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { Button  } from "antd"; 

import axios from '../../config/axiosConfig';

function Posts() {
    const [value, setValue] = useState('');
    // const [posts, setPosts] = useState(null);

    // useEffect(() => {
    //     const fetchPosts = async () => {
    //         try {
    //             const response = await axios.get('/posts');
    //             setPosts(response.data.data);
                
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    //     console.log(posts);
    //     fetchPosts();
    // }, []);
	return (
        <div className="flex flex-col  lg:px-48 lg:py-11">
           
                <h2 className="text-xl uppercase mb-4 text-left">Your Posts</h2>
                <ReactQuill 
                    value={value} 
                    onChange={setValue} 
                    modules={{
                        toolbar: [
                            [{ 'font': [] }, { 'size': [] }],
                            ['bold', 'italic', 'underline', 'strike'],
                            [{ 'color': [] }, { 'background': [] }],
                            [{ 'script': 'sub'}, { 'script': 'super' }],
                            ['blockquote', 'code-block'],
                            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                            [{ 'indent': '-1'}, { 'indent': '+1' }, { 'align': [] }],
                            ['link', 'image', 'video'],
                            ['clean']                                         
                        ]
                    }}
                    formats={[
                        'font', 'size', 'bold', 'italic', 'underline', 'strike',
                        'color', 'background', 'script', 'blockquote', 'code-block',
                        'list', 'bullet', 'indent', 'align', 'link', 'image', 'video'
                    ]}
                />
                <div className="pt-4 text-left">
                    <Button type="submit" className="bg-blue-600 text-white h-10">Post</Button>
                </div>
         
        </div>
    );
}

export default Posts;
