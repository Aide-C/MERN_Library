import React from "react";
import './App.css';
import {useState, useEffect} from "react";

function Avail(){
    const [list, setList] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const findAvail = async () => {
            try{
                const res = await fetch('http://localhost:3001/avail', {
                    method: "GET"
                });

                if (res.ok){
                    const data = await res.json();
                    setList(data);
                }else{
                    const errorData = await res.json();
                    setError(errorData.error);
                }
            }catch(err){
                setError("Failed to fetch the available books");
                console.error("Error when fetching available books lists: ", err);

            }
        };

        findAvail();
    }, []);

    if (error){
        return(
            <div>Error: {error}</div>
        );
    }

    return(
        <div>
            <h1>Available Books</h1>
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

export default Avail;