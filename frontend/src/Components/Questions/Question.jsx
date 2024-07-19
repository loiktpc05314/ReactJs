import React from "react";
import { SearchOutlined, FacebookOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom"; // hoặc bất kỳ thư viện nào bạn sử dụng cho routing
import { Image } from "antd"; // Thư viện của Ant Design cho hình ảnh

import PaginationPage from "../SharePagination/Pagination";
function QuestionsPage() {
    return (
        <>
            <div className="pb-4 pt-4">
                <div className="pt-4 px-3">
 
                        <h2 className="text-3xl uppercase mb-4">
                            All Questions
                        </h2>
                 
                            <div className="flex flex-wrap md:flex-nowrap justify-center">
                                <div className="grow pl-6  pb-8  md:border-l-[1px]">
                                    <div className="flex flex-row justify-between  border-b-[1px] mt-3">
                                        <div className="w-[11.25rem] h-[6.313rem] ">
                                            <Image
                                                src="https://tpc.googlesyndication.com/simgad/3352512289381417150"
                                                alt="Picture of the author"
                                                style={{ width: 'auto', height: 'auto' }}
                                            />
                                        </div>
                                        <div className="pb-5 mb-5 flex-[3] pl-2">
                                            <Link to="/detailquestion" className="mb-[6px] text-2xl hover:text-blue-500">
                                                How to output the correlation/euclidian value for the dendogram in pheatmap R?
                                            </Link>
                                            <p className="mb-4 italic">
                                            Using pheatmap in R, I would like to know if there is a way to output the euclidian distance/correlation value used in clustering? I understand that these are represented by the dendogram branches but ...
                                            </p>
                                            <div className="flex gap-2">
                                                <Link to="" className="bg-gray-200 hover:bg-gray-300 rounded-lg p-1 text-sm">JavaScript</Link>
                                                <Link to="" className="bg-gray-200 hover:bg-gray-300 rounded-lg p-1 text-sm">Java</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-between  border-b-[1px] mt-3">
                                        <div className="w-[11.25rem] h-[6.313rem] ">
                                            <Image
                                                src="https://tpc.googlesyndication.com/simgad/3352512289381417150"
                                                alt="Picture of the author"
                                                style={{ width: 'auto', height: 'auto' }}
                                            />
                                        </div>
                                        <div className="pb-5 mb-5 flex-[3] pl-2">
                                            <Link to="" className="mb-[6px] text-2xl hover:text-blue-500">
                                                How to output the correlation/euclidian value for the dendogram in pheatmap R?
                                            </Link>
                                            <p className="mb-4 italic">
                                            Using pheatmap in R, I would like to know if there is a way to output the euclidian distance/correlation value used in clustering? I understand that these are represented by the dendogram branches but ...
                                            </p>
                                            <div className="flex gap-2">
                                                <Link to="" className="bg-gray-200 hover:bg-gray-300 rounded-lg p-1 text-sm">JavaScript</Link>
                                                <Link to="" className="bg-gray-200 hover:bg-gray-300 rounded-lg p-1 text-sm">Java</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-between  border-b-[1px] mt-3">
                                        <div className="w-[11.25rem] h-[6.313rem] ">
                                            <Image
                                                src="https://tpc.googlesyndication.com/simgad/3352512289381417150"
                                                alt="Picture of the author"
                                                style={{ width: 'auto', height: 'auto' }}
                                            />
                                        </div>
                                        <div className="pb-5 mb-5 flex-[3] pl-2">
                                            <Link to="" className="mb-[6px] text-2xl hover:text-blue-500">
                                                How to output the correlation/euclidian value for the dendogram in pheatmap R?
                                            </Link>
                                            <p className="mb-4 italic">
                                            Using pheatmap in R, I would like to know if there is a way to output the euclidian distance/correlation value used in clustering? I understand that these are represented by the dendogram branches but ...
                                            </p>
                                            <div className="flex gap-2">
                                                <Link to="" className="bg-gray-200 hover:bg-gray-300 rounded-lg p-1 text-sm">JavaScript</Link>
                                                <Link to="" className="bg-gray-200 hover:bg-gray-300 rounded-lg p-1 text-sm">Java</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-between  border-b-[1px] mt-3">
                                        <div className="w-[11.25rem] h-[6.313rem] ">
                                            <Image
                                                src="https://tpc.googlesyndication.com/simgad/3352512289381417150"
                                                alt="Picture of the author"
                                                style={{ width: 'auto', height: 'auto' }}
                                            />
                                        </div>
                                        <div className="pb-5 mb-5 flex-[3] pl-2">
                                            <Link to="" className="mb-[6px] text-2xl hover:text-blue-500">
                                                How to output the correlation/euclidian value for the dendogram in pheatmap R?
                                            </Link>
                                            <p className="mb-4 italic">
                                            Using pheatmap in R, I would like to know if there is a way to output the euclidian distance/correlation value used in clustering? I understand that these are represented by the dendogram branches but ...
                                            </p>
                                            <div className="flex gap-2">
                                                <Link to="" className="bg-gray-200 hover:bg-gray-300 rounded-lg p-1 text-sm">JavaScript</Link>
                                                <Link to="" className="bg-gray-200 hover:bg-gray-300 rounded-lg p-1 text-sm">Java</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-between  border-b-[1px] mt-3">
                                        <div className="w-[11.25rem] h-[6.313rem] ">
                                            <Image
                                                src="https://tpc.googlesyndication.com/simgad/3352512289381417150"
                                                alt="Picture of the author"
                                                style={{ width: 'auto', height: 'auto' }}
                                            />
                                        </div>
                                        <div className="pb-5 mb-5 flex-[3] pl-2">
                                            <Link to="" className="mb-[6px] text-2xl hover:text-blue-500">
                                                How to output the correlation/euclidian value for the dendogram in pheatmap R?
                                            </Link>
                                            <p className="mb-4 italic">
                                                Using pheatmap in R, I would like to know if there is a way to output the euclidian distance/correlation value used in clustering? I understand that these are represented by the dendogram branches but ...
                                            </p>
                                            <div className="flex gap-2">
                                                <Link to="" className="bg-gray-200 hover:bg-gray-300 rounded-lg p-1 text-sm">JavaScript</Link>
                                                <Link to="" className="bg-gray-200 hover:bg-gray-300 rounded-lg p-1 text-sm">Java</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-4">
                                        <PaginationPage />
                                    </div>
                                </div>
                                <div className="flex-none w-[272px]  md:block  px-3">
                                    <h4 className="text-xl  mb-4">Related Tags</h4>
                                    <div>
                                        <div className="ml-6 mb-3 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg p-1 w-fit">
                                            <Link to="">JavaScript</Link>
                                        </div>
                                        <div className="ml-6 mb-3 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg p-1 w-fit">
                                            <Link to="">Python</Link>
                                        </div>
                                        <div className="ml-6 mb-3 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg p-1 w-fit">
                                            <Link to="">Java</Link>
                                        </div>
                                        <div className="ml-6 mb-3 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg p-1 w-fit">
                                            <Link to="">C#</Link>
                                        </div>
                                        <div className="ml-6 mb-3 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg p-1 w-fit">
                                            <Link to="">PHP</Link>
                                        </div>
                                        <div className="ml-6 mb-3 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg p-1 w-fit">
                                            <Link to="">C++</Link>
                                        </div>
                                        <div className="ml-6 mb-3 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg p-1 w-fit">
                                            <Link to="">CSS</Link>
                                        </div>
                                        <div className="ml-6 mb-3 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg p-1 w-fit">
                                            <Link to="">HTML</Link>
                                        </div>
                                    </div>
                                    <h4 className="text-xl  mb-4">Hot Network Questions</h4>
                                    <div>
                                        <div className="ml-6 mb-3 text-xs hover:text-blue-500">
                                            <Link to="">How to output the correlation/euclidian value for the dendogram in pheatmap R?</Link>
                                        </div><hr />
                                        <div className="ml-6 mb-3 text-xs hover:text-blue-500">
                                            <Link to="">How to output the correlation/euclidian value for the dendogram in pheatmap R?</Link>
                                        </div><hr />
                                        <div className="ml-6 mb-3 text-xs hover:text-blue-500" >
                                            <Link to="">How to output the correlation/euclidian value for the dendogram in pheatmap R?</Link>
                                        </div><hr />
                                      
                                    </div>
                                    
                                </div>
                            </div>
                     
                    
                </div>
            </div>
        </>
    );
}

export default QuestionsPage;
