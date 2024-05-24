import React, { useState, useEffect } from "react";
import './App.css';

function Unavail() {
    const [list, setList] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const findUnavail = async () => {
            try {
                const res = await fetch("http://localhost:3001/unavail", {
                    method: "GET"
                });

                if (res.ok) {
                    const data = await res.json();
                    setList(data);
                } else {
                    const errorData = await res.json();
                    setError(errorData.error);
                }

            } catch (err) {
                setError("Failed to fetch unavailable books");
                console.error('Failed to fetch unavailable books:', err);
            }
        };

        findUnavail();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Unavailable Books</h1>
            <div className="list">
                <ul>
                    {list.map((book) => (
                        <li key={book.id}>ID: {book.id} - Title: {book.title}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Unavail;