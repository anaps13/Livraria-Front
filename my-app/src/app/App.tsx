import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BookList from '../listar/BookList';
import BookForm from '../adicionar/BookForm';
import BookDetails from '../detalhes/BookDetails';
import DeleteBookPage from '../deletar/DeleteBookPage';
import './App.css';
import BookCount from '../contagem/BookCount';
import BookEditForm from '../editar/BookEditForm';
import SearchBookById from '../buscar/SearchBookById';
import { Book } from '../models/Book';

// Componente principal do aplicativo
const App: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Função para alternar entre os modos claro e escuro
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <Router>
            <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
                <nav className="navbar">
                    <Link to="/books"><button>Books</button></Link>
                    <Link to="/add-book"><button>Add Book</button></Link>
                    <Link to="/delete-book"><button>Delete Book</button></Link>
                    <Link to="/book-count"><button>Book Count</button></Link>
                    <Link to="/search-book"><button>Search Book</button></Link>
                    <button onClick={toggleDarkMode}>
                        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    </button>
                </nav>
                <Routes>
                    <Route path="/" element={<BookList isDarkMode={isDarkMode} />} />
                    <Route path="/books" element={<BookList isDarkMode={isDarkMode} />} />
                    <Route path="/add-book" element={<BookForm />} />
                    <Route path="/delete-book" element={<DeleteBookPage />} />
                    <Route path="/books/:id" element={<BookDetails isDarkMode={isDarkMode} />} />
                    <Route path="/book-count" element={<BookCount isDarkMode={isDarkMode} />} />
                    <Route path="/search-book" element={<SearchBookById isDarkMode={isDarkMode} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
