import React from "react";
import './App.css';
import { useState } from "react";

function DeleteBook(){
    const [message, setMessage] = useState();
    const [error, setError] = useState(null);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const bookId = document.getElementById("bookID").value;

        if (bookId.trim() === ''){
            alert("Fill in all requirments");
            return;
        }

        try{
            const url = "http://localhost:3001/delete_book/";

            const res = await fetch(url+bookId, {
                method: "DELETE",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: bookId
                })
            });
            
            if(res.ok){
                const data = await res.json();
                setMessage(data.message);
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
            <h1>Delete A Book</h1>
            <div>
                <div>
                    <label><strong>ID: </strong></label>
                    <input 
                        type="text"
                        placeholder="Enter id"
                        autoComplete="off"
                        id="bookID"
                        className="inputs"
                    />
                </div>
                <button className="inputs" onClick={handleSubmit}>Submit</button>
            </div>
            {error && (<h2>Error: {error}</h2>)}
            {message && (<h2>{message}</h2>)}
        </div>
    );
}

export default DeleteBook;