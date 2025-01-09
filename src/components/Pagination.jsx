import React from 'react'

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {

    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

    return (
        <nav className='mt-10'>
            <ul className='pagination justify-content-center'>      
                {pageNumbers.map(pgNumber => (
                    <li key={pgNumber} 
                        className= {`page-item ${currentPage == pgNumber ? 'active' : ''} `} >
                        <a  onClick={() => setCurrentPage(pgNumber)}  
                            className='page-link' 
                            href='#'>   
                                {pgNumber}
                        </a>
                    </li>
                ))}    
            </ul>
        </nav>
    )
}

export default Pagination