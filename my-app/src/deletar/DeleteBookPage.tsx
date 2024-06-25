import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './DeleteBookPage.css';

// Componente para deletar um livro
const DeleteBookPage: React.FC = () => {
    const [books, setBooks] = useState<any[]>([]);
    const [selectedBookId, setSelectedBookId] = useState<string>('');
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        // Função para buscar todos os livros
        const fetchBooks = async () => {
            const response = await api.get('/books');
            setBooks(response.data);
        };

        fetchBooks();
    }, []);

    // Função para deletar um livro
    const handleDelete = async () => {
        try {
            const book = books.find(book => book.id === selectedBookId);
            await api.delete(`/books/${selectedBookId}`);
            setMessage(`Book "${book.title}" successfully deleted!`);
            setSelectedBookId('');
            const response = await api.get('/books');
            setBooks(response.data); // Atualizar a lista de livros
        } catch (error) {
            console.error('Failed to delete book:', error);
            setMessage('Failed to delete book.');
        }
    };

    return (
        <div className="delete-book-page">
            <h1>Delete Book</h1>
            <select onChange={(e) => setSelectedBookId(e.target.value)} value={selectedBookId}>
                <option value="" disabled>Select a book</option>
                {books.map(book => (
                    <option key={book.id} value={book.id}>{book.title}</option>
                ))}
            </select>
            {selectedBookId && (
                <button onClick={handleDelete} className="book-delete-button">Delete</button>
            )}
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default DeleteBookPage;
