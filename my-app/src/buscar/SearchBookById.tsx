import React, { useState } from 'react';
import api from '../services/api';
import './SearchBookById.css';

interface Book {
    id: string;
    title: string;
    author: string;
}

interface SearchBookByIdProps {
    isDarkMode: boolean;
}

// Componente para buscar e editar um livro pelo ID
const SearchBookById: React.FC<SearchBookByIdProps> = ({ isDarkMode }) => {
    const [bookId, setBookId] = useState('');
    const [book, setBook] = useState<Book | null>(null);
    const [message, setMessage] = useState('');

    // Função para buscar o livro pelo ID
    const handleSearch = async () => {
        try {
            // Envia uma solicitação GET para a API para buscar o livro pelo 
            const response = await api.get(`/books/${bookId}`);
            setBook(response.data);
            setMessage('');
        } catch (error) {
            setBook(null);
            setMessage('Book not found.');
        }
    };

    // Função para atualizar os dados do livro
    const handleUpdate = async () => {
        if (!book) return;
        try {
            await api.put(`/books/${book.id}`, book);
            setMessage('Book updated successfully!');
        } catch (error) {
            setMessage('Failed to update book.');
        }
    };

    // Função para lidar com a mudança nos campos de entrada
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBook((prevBook) => {
            if (!prevBook) return null;
            return { ...prevBook, [name]: value };
        });
    };

    return (
        <div className={`search-book-by-id ${isDarkMode ? 'dark-mode' : ''}`}>
            <h1>Search and Edit Book by ID</h1>
            <div>
                <label>Book ID</label>
                <input
                    value={bookId}
                    onChange={(e) => setBookId(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            {message && <p className="message">{message}</p>}
            {book && (
                <div className="book-details">
                    <h2>Edit Book</h2>
                    <div>
                        <label>Title</label>
                        <input
                            name="title"
                            value={book.title}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Author</label>
                        <input
                            name="author"
                            value={book.author}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button onClick={handleUpdate}>Update</button>
                </div>
            )}
        </div>
    );
};

export default SearchBookById;
