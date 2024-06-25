import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import BookEditForm from '../editar/BookEditForm';
import './BookList.css';
import { Book } from '../models/Book';

interface BookListProps {
    isDarkMode: boolean;
}

// Componente para listar todos os livros
const BookList: React.FC<BookListProps> = ({ isDarkMode }) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [editingBook, setEditingBook] = useState<Book | null>(null);

    useEffect(() => {
        // Função para buscar todos os livros
        const fetchBooks = async () => {
            const response = await api.get('/books');
            setBooks(response.data);
        };

        fetchBooks();
    }, []);

    // Função para salvar as alterações do livro editado
    const handleEditSave = async (updatedBook: Book) => {
        try {
            // Envia uma solicitação PUT para a API para atualizar o livro
            await api.put(`/books/${updatedBook.id}`, updatedBook);
            setBooks((prevBooks) =>
                prevBooks.map((book) => (book.id === updatedBook.id ? updatedBook : book))
            );
            setEditingBook(null);
        } catch (error) {
            console.error('Failed to update book:', error);
        }
    };

    return (
        <div className="book-list">
            <h1>Books</h1>
            <ul>
                {books.map((book) => (
                    <li key={book.id}>
                        <p><strong>Livro:</strong> {book.title}</p>
                        <p><strong>Autor:</strong> {book.author}</p>
                        <div className="button-container">
                            <button onClick={() => setEditingBook(book)} className="edit">Edit</button>
                            <Link to={`/books/${book.id}`}><button className="details">Details</button></Link>
                        </div>
                    </li>
                ))}
            </ul>
            {editingBook && (
                <BookEditForm
                    book={editingBook}
                    onClose={() => setEditingBook(null)}
                    onSave={handleEditSave}
                    isDarkMode={isDarkMode}
                />
            )}
        </div>
    );
};

export default BookList;
