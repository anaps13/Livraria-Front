import React, { useState } from 'react';
import './BookEditForm.css';

interface Book {
    id: string;
    title: string;
    author: string;
}

interface BookEditFormProps {
    book: Book;
    onClose: () => void;
    onSave: (updatedBook: Book) => void;
    isDarkMode: boolean;
}

// Componente para editar os detalhes de um livro
const BookEditForm: React.FC<BookEditFormProps> = ({ book, onClose, onSave, isDarkMode }) => {
    const [title, setTitle] = useState(book.title);
    const [author, setAuthor] = useState(book.author);

    // Função para salvar as alterações do livro
    const handleSave = () => {
        const updatedBook = { ...book, title, author };
        onSave(updatedBook);
    };

    return (
        <div className={`book-edit-form ${isDarkMode ? 'dark-mode' : ''}`}>
            <h2>Edit Book</h2>
            <form>
                <div>
                    <label>Title</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Author</label>
                    <input value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <div className="button-container">
                    <button type="button" className="save" onClick={handleSave}>Save</button>
                    <button type="button" className="cancel" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default BookEditForm;
