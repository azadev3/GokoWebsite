import React from 'react';
import '../Container/Container.scss';
import Homepage from '../Pages/Homepage/Homepage';
import SearchPage from '../Pages/Search/SearchPage';
import Messages from '../Pages/Messages/Messages';

export default function Container() {
   const  currentPage = window.location.pathname;

  return (
     <div className="container">
          {currentPage === '/' ? <Homepage /> : ''}
          {currentPage === '/search-axtarish' ? <SearchPage /> : ''}
          {currentPage === '/messages-mesasjlar' ? <Messages /> : ''}

     </div>
  )
}
