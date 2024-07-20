import React from "react";
import { Pagination } from 'antd';


function PaginationPage(){
    return(<>
        <Pagination align="start" defaultCurrent={1} total={50} />
    </>)
};

export default PaginationPage;

