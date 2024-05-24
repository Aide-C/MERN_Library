import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import NavBar from './Navbar';
import Avail from './Available';
import Unavail from './Unavailable';
import Add from './AddBook';
import Delete from './DeleteBook';
import Find from './FindBook';
import Home from './Home';
import User from './UserBooks';
import Books from './AllBooks';

function App() {
  return (
      <Router>
        <div>
        <NavBar />
        <Routes>
          <Route path='/books' element={<Books />} />
          <Route path='/available' element={<Avail />}/>
          <Route path='/unavailable' element={<Unavail />}/>
          <Route path='add_book' element={<Add />} />
          <Route path='delete_book/id' element={<Delete />}/>
          <Route path='find_book/id' element={<Find />} />
          <Route path='/books/id' element={<User />} />
          <Route path='/*' element={<Home />}/>
        </Routes>
        </div>
      </Router>
  );
}

export default App;
