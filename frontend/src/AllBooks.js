import React from "react";
import './App.css';
import {useState, useEffect} from "react";

function AllBooks(){
    const [list, setList] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const findBooks = async () => {
            try{
                const res = await fetch('http://localhost:3001/books', {
                    method: "GET"
                });

                if (res.ok){
                    const data = await res.json();
                    setList(data);
                }else{
                    const errorData = res.json();
                    setError(errorData.error);
                }
            }catch(err){
                setError("Failed to fetch books");
                console.error("Error when fetching books list: ", err);

            }
        };

        findBooks();
    }, []);

    if (error){
        return(
            <div>Error: {error}</div>
        );
    }

    return(
        <div>
            <h1>All Books</h1>
            <div className="list">
                <ul>
                    {list.map((book) =>(
                        <li key={book.id}>ID: {book.id} - Title: {book.title}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default AllBooks;