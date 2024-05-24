import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function NavBar(){
    return(
        <nav className='navBar'>
            <ul>
                <li>TXST CS3320 Library</li>
                <li><Link to="/books">Books</Link></li>
                <li><Link to="/available">Available</Link></li>
                <li><Link to="/unavailable">Unavailable</Link></li>
                <li><Link to="/add_book">Add Book</Link></li>
                <li><Link to="/delete_book/id">Delete Book</Link></li>
                <li><Link to="/find_book/id">Find Book Details</Link></li>
                <li><Link to="/books/id">Check-In/Out</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;
