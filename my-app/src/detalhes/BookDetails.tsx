import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import './BookDetails.css';

interface Book {
    id: string;
    title: string;
    author: string;
}

interface BookDetailsProps {
    isDarkMode: boolean;
}

// Componente para exibir os detalhes de um livro específico
const BookDetails: React.FC<BookDetailsProps> = ({ isDarkMode }) => {
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<Book | null>(null);

    useEffect(() => {
        // Função para buscar os detalhes do livro pelo ID
        const fetchBook = async () => {
            try {
                const response = await api.get(`/books/${id}`);
                setBook(response.data);
            } catch (error) {
                console.error('Failed to fetch book details:', error);
            }
        };

        fetchBook();
    }, [id]);

    if (!book) {
        return <p>Loading book details...</p>;
    }

    return (
        <div className={`book-details ${isDarkMode ? 'dark-mode' : ''}`}>
            <h1>{book.title}</h1>
            <p><strong>ID:</strong> {book.id}</p>
            <p><strong>Author:</strong> {book.author}</p>
        </div>
    );
};

export default BookDetails;
