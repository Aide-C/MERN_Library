import React, { useState } from "react";
import './App.css';

function AddBook(){
    const [id, setId] =  useState();
    const [title, setTitle] =  useState();
    const [author, setAuthor] =  useState();
    const [publisher, setPublisher] =  useState();
    const [isbn, setIsbn] =  useState();
    const [message, setMessage] = useState();
    const [error, setError] = useState(null);


    const handleSubmit = async(e) =>{
        e.preventDefault();

        if(id.trim() === '' || title.trim() === '' || author.trim() === '' || publisher.trim() === '' || isbn.trim() === ''){
            alert("Enter all necessary requirements");
            return;
        }

        try{
            const res = await fetch("http://localhost:3001/add_book", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id,
                    title: title,
                    author: author,
                    publisher: publisher,
                    isbn: isbn
                })
            });

            if (res.status === 201){
                const data = await res.json();
                setMessage(data.message);
            }else{
                const errorData = await res.json();
                setMessage(errorData.error);
            }
        }catch(err){
            console.error("Failed add new book: ", err);
            setError("Failed to add book");
        }
    };

    return(
        <div>
            <h1>Add Book</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label><strong>ID: </strong></label>
                        <input
                            type="text"
                            placeholder="Enter id"
                            autoComplete="off"
                            className="inputs"
                            onChange={(e) => setId(e.target.value)}
                        />
                    </div>

                    <div>
                        <label><strong>Title: </strong></label><input
                            type="text"
                            placeholder="Enter title"
                            autoComplete="off"
                            className="inputs"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div>
                        <label><strong>Author: </strong></label>
                        <input
                            type="text"
                            placeholder="Enter author"
                            autoComplete="off"
                            className="inputs"
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </div>

                    <div>
                        <label><strong>Publisher: </strong></label>
                        <input
                            type="text"
                            placeholder="Enter publisher"
                            autoComplete="off"
                            className="inputs"
                            onChange={(e) => setPublisher(e.target.value)}
                        />
                    </div>

                    <div>
                        <label><strong>ISBN: </strong></label>
                        <input
                            type="text"
                            placeholder="Enter isbn"
                            autoComplete="off"
                            className="inputs"
                            onChange={(e) => setIsbn(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="inputs">Submit</button>
                </form>
            </div>
            {error && (<h2>Error: {error}</h2>)}
            {message && (<h2>{message}</h2>)}
        </div>
    );
}

export default AddBook;