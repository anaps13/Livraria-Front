import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './BookCount.css';

interface BookCountProps {
    isDarkMode: boolean;
}

// Componente para exibir a contagem total de livros
const BookCount: React.FC<BookCountProps> = ({ isDarkMode }) => {
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        // Função para buscar a contagem de livros
        const fetchBookCount = async () => {
            try {
                // Enviar uma solicitação GET para a API para obter a contagem de livros
                const response = await api.get('/books/count');
                setCount(response.data);
            } catch (error) {
                console.error('Failed to fetch book count:', error);
            }
        };

        fetchBookCount();
    }, []);

    return (
        <div className={`book-count ${isDarkMode ? 'dark-mode' : ''}`}>
            <h1>Book Count</h1>
            {count !== null ? <p>Total books: {count}</p> : <p>Loading book count...</p>}
        </div>
    );
};

export default BookCount;
