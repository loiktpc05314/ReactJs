'use client';
import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import { Image, Button  } from "antd"; 
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './style.css';
import CommentSection from "../Comment/CommentSection";


function DetailQuestion(){
    const [value, setValue] = useState('');
    return(
        <div className="pb-4 pt-4">
            <div className="pt-4 px-3">
                <div>
                    <h2 className="text-xl uppercase mb-4">
                        How to output the correlation/euclidian value for the dendogram in pheatmap R?
                    </h2>
                    <hr /> 
                    <br />
                </div>
                        
                <div className="flex flex-wrap md:flex-nowrap justify-center">
                    <div className="grow pl-6 pb-8 md:border-l-[1px]">
                        <img
                            src="https://tpc.googlesyndication.com/simgad/13551291069670685580"
                            alt="Picture of the author"
                            className="w-full"
                        />  
                        <div className="justify-center  mt-3">
                            <div className="">
                                <Image
                                    src="https://img.timviec.com.vn/2020/01/source-code-la-gi1.jpg"
                                    alt="Picture of the author"
                                    style={{ width: '910px', height: '100%' }}
                                />
                            </div>
                            <div className="pb-5 mb-5 pl-2">
                                <p className="mb-4">
                                    Using pheatmap in R, I would like to know if there is a way to output the euclidian distance/correlation value used in clustering?
                                    I understand that these are represented by the dendogram branches but I am unsure on how to add a legend for euclidian distances 
                                    or to print out the correlation value for the branch.
                                </p>
                                <pre className="bg-gray-200 p-4 rounded-lg overflow-x-auto">
                                    <code>
                                        {`pheatmap(
  data,
  clustering_distance_cols = "correlation",
  main = "Proteome vs Transcriptome",
  legend = TRUE,
  clustering_distance_rows = "euclidean",
  scale = "none"
)`}
                                    </code>
                                </pre>
                                <p className="mt-4">Above is the general code I use. Specifically, I want to <strong>extract and print the value in clustering_distance_cols = "correlation"</strong>. If possible as well, I'd like to add a legend for clustering_distance_rows = "euclidean". Looking through the arguments for this, there doesn't seem to be a direct way to print out the value.</p>
                                <p className="mt-4">I am also open to learning other packages that may have this function.</p>
                                <p className="mt-4">Thank you so much for any advice you may offer for this!</p>
                                <div className="flex gap-2 pt-2">
                                    <Link to="" className="bg-gray-200 hover:bg-gray-300 rounded-lg p-1 text-sm">JavaScript</Link>
                                    <Link to="" className="bg-gray-200 hover:bg-gray-300 rounded-lg p-1 text-sm">Java</Link>
                                </div>
                                <p className="pt-3">Know someone who can answer? Share a link to this question via email, Twitter, or Facebook.</p>
                                <div className="pt-4 App">
                                    <h2 className="text-xl uppercase mb-4 text-left">Your Answer</h2>
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
                                        <Button type="submit" className="bg-blue-600 text-white h-10">Post Your Answer</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-none w-[272px] md:block px-3">
                        <h4 className="text-xl mb-4">Hot Network Questions</h4>
                        <div>
                            <div className="ml-6 mb-3 text-xs hover:text-blue-500">
                                <Link to="">How to output the correlation/euclidian value for the dendogram in pheatmap R?</Link>
                            </div>
                            <hr />
                            <div className="ml-6 mb-3 text-xs hover:text-blue-500">
                                <Link to="">How to output the correlation/euclidian value for the dendogram in pheatmap R?</Link>
                            </div>
                            <hr />
                            <div className="ml-6 mb-3 text-xs hover:text-blue-500">
                                <Link to="">How to output the correlation/euclidian value for the dendogram in pheatmap R?</Link>
                            </div>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
            <CommentSection />
        </div>
    );
}

export default DetailQuestion;
