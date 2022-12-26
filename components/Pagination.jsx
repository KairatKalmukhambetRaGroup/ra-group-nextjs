import React from "react";

const PaginateItem = ({type, pageNo='1', className='', disabled=false, handleClick}) => {
    return disabled ? 
    (
        <span className={`paginate-item ${className}`}>
            {type ? 
                type === 'btn' ? <i></i> : '...'    
            : pageNo}
        </span>
    ) : (
        <span className={`paginate-item ${className}`} data-page={pageNo} onClick={handleClick}>
            {type ? 
                type === 'btn' ? <i></i> : '...'    
            : pageNo}
        </span>
    )
}

const Pagination = ({totalPages, page, setPage}) => {
    if(totalPages < 2)
        return null;
    const handleClick = (e) => {
        e.preventDefault();
        const pg = e.currentTarget.dataset.page;
        setPage(pg);
        console.log(pg);
    }
    return (
        <div className='paginate-container'>
            <div className='paginate'>                 
                <PaginateItem type='btn' className='page-prev' disabled={page==1} handleClick={handleClick} pageNo={Number(page)-1} />
                {page > 3 && <PaginateItem handleClick={handleClick} pageNo={1} />}
                {page > 4 && <PaginateItem type='ellipsis' className='ellipsis' />}
                {page > 2 && <PaginateItem handleClick={handleClick} pageNo={Number(page)-2} />}
                {page > 1 && <PaginateItem handleClick={handleClick} pageNo={Number(page)-1} />}
                <PaginateItem className='active' pageNo={page} />
                {page < totalPages && <PaginateItem handleClick={handleClick} pageNo={Number(page)+1} />}
                {page < totalPages-1 && <PaginateItem handleClick={handleClick} pageNo={Number(page)+2} />}
                {page < totalPages-3 && <PaginateItem type='ellipsis' className='ellipsis' />}
                {page < totalPages-2 && <PaginateItem handleClick={handleClick} pageNo={totalPages} />}
                <PaginateItem type='btn' className='page-next' disabled={page==totalPages} handleClick={handleClick} pageNo={Number(page)+1} />
            </div>
        </div>
    );
}
export default Pagination;