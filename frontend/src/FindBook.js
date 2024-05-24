import React from "react";
import './App.css';
import { useState } from "react";

function FindBook(){
    const [message, setMessage] = useState();
    const [error, setError] = useState(null);

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const bookId = document.getElementById("bookID").value;
        const url = "http://localhost:3001/find_book/";

        if (bookId.trim() === ''){
            alert("Fill in all requirments");
            return;
        }

        try{
            const res = await fetch(url + bookId, {
                method: "GET"
            });
            
            if(res.ok){
                const data = await res.json();
                setMessage(data);
            }else{
                const data = await res.json();
                setMessage(data.error)
            }
        }catch(err){
            console.error("Failed get request to check in book: ", err);
            setError("Failed to fetch book");
        }
    };

    return (
        <div>
            <h1>Find Book Details</h1>
            <div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <label><strong>ID: </strong></label>
                        <input 
                            type="text"
                            placeholder="Enter id"
                            autoComplete="off"
                            id="bookID"
                            className="inputs"
                        />
                        <button type="submit" className="inputs">Submit</button>
                    </form>
                </div>
                
            </div>
            {error && (<h2>Error: {error}</h2>)}
            {message && (
                <div>
                    <h2>ID: {message.id}</h2>
                    <h2>Title: {message.title}</h2>
                    <h2>Author: {message.author}</h2>
                    <h2>Publisher: {message.publisher}</h2>
                    <h2>ISBN: {message.isbn}</h2>
                    <h2>Available: {message.avail}</h2>
                    <h2>Who: {message.who}</h2>
                    <h2>Due: {message.due}</h2>
                </div>
            )}
        </div>
    );
}

export default FindBook;