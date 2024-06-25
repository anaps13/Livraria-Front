import React, { useState } from 'react';
import api from '../services/api';
import './BookForm.css';

// Componente para adicionar um novo livro
const BookForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [message, setMessage] = useState('');

    // Função para lidar com o envio do formulário
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Verificação para garantir que os campos estejam preenchidos
        if (!title || !author) {
            setMessage('Please fill out all fields.');
            return;
        }

        try {
            // Envia uma solicitação POST para a API para adicionar o livro
            await api.post('/books', { title, author });
            setMessage('Book added successfully!');
            setTitle('');
            setAuthor('');
        } catch (error) {
            setMessage('Failed to add book.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="book-form">
            <div>
                <label>Title</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
                <label>Author</label>
                <input value={author} onChange={(e) => setAuthor(e.target.value)} />
            </div>
            <button type="submit">Add Book</button>
            {message && <p className="success-message">{message}</p>}
        </form>
    );
};

export default BookForm;
