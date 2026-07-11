import React, { useState, useEffect } from 'react';
import './BookList.css'; // You'll create this CSS file

const BookList = () => {
    const [bookList, setBookList] = useState([]);
    const [selectedBookUrl, setSelectedBookUrl] = useState(null);

    useEffect(() => {
        const fetchBookList = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/books'); 
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setBookList(data);
            } catch (error) {
                console.error("BookList.js: Could not fetch book list:", error);
            }
        };

        fetchBookList();
    }, []);

    const handleBookSelection = (filename) => {
        setSelectedBookUrl(`http://localhost:5000/api/books/book-content/${filename}`); // URL for streaming book
    };

    return (
        <div className="book-list-container">
            <div className="book-playlist">
                <h3>Available Books</h3>
                <ul>
                    {bookList.map((filename, index) => (
                        <li
                            key={index}
                            onClick={() => handleBookSelection(filename)}
                            className="book-list-item"
                        >
                            {filename}
                        </li>
                    ))}
                </ul>
            </div>

            {selectedBookUrl && (
                <div className="pdf-viewer">
                    <h3>Reading Book</h3>
                    <iframe
                        src={selectedBookUrl}
                        title="Book Viewer"
                        width="100%"
                        height="500px" // Adjust height as needed
                    ></iframe>
                </div>
            )}
        </div>
    );
};

export default BookList; 