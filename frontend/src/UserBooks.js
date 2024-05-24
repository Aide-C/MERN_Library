import React, { useState } from "react";
import './App.css';

function UserBooks() {
    const [checkOut, setCheckOut] = useState({
        avail: false,
        who: "",
        due: ""
    });
    const [message, setMessage] = useState();
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setCheckOut({ ...checkOut, [e.target.name]: e.target.value });
    };

    const handleCheckIn = async(e) => {
        e.preventDefault();
        const bookId = document.getElementById("bookID").value;
        const url = "http://localhost:3001/check_in/books/";

        if (bookId.trim() === '') {
            alert("Put in book ID for check-in");
            return;
        }

        try {
            const res = await fetch(url + bookId, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    avail: true,
                    who: "",
                    due: ""
                })
            });

            if (res.ok) {
                const data = await res.json();
                setMessage(data.message);
            } else {
                const errorData = await res.json();
                setError(errorData.error);
            }
        } catch (err) {
            console.error("Failed to check-in book: ", err);
            setError("Failed to fetch book");
        }
    };

    const handleCheckOut = async(e) => {
        e.preventDefault();
        const bookId = document.getElementById("bookID").value;
        const url = "http://localhost:3001/check_out/books/";

        if (bookId.trim() === '') {
            alert("Fill in all check out requirements");
            return;
        }

        try {
            const res = await fetch(url + bookId, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(checkOut)
            });

            if (res.ok) {
                const data = await res.json();
                setMessage(data.message);
            } else {
                const errorData = await res.json();
                setError(errorData.error);
            }
        } catch (err) {
            console.error("Failed to check out book: ", err);
            setError("Failed to fetch book");
        }
    };

    return (
        <div>
            <h1>Check-In/Out Book</h1>
            <div>
                <form onSubmit={handleCheckOut}>
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

                    <button className="inputs" onClick={handleCheckIn}>Check-In Book</button>

                    <div>
                        <label><strong>Who: </strong></label>
                        <input
                            type="text"
                            placeholder="Enter customer's name"
                            autoComplete="off"
                            name="who"
                            className="inputs"
                            value={checkOut.who}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label><strong>Due: </strong></label>
                        <input
                            type="text"
                            placeholder="Enter two weeks from today's date"
                            autoComplete="off"
                            name="due"
                            className="inputs"
                            value={checkOut.due}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="inputs">Check-Out Book</button>
                </form>
            </div>

            {error && (<h2>Error: {error}</h2>)}
            {message && (<h2>{message}</h2>)}
        </div>
    );
}

export default UserBooks;
