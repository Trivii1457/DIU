import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { initializeDatabase } from './data/database/db';
import HomePage from './presentation/pages/HomePage';

function App() {
  useEffect(() => {
    // Inicializar la base de datos al cargar la aplicación
    initializeDatabase();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-background-light dark:bg-background-dark">
        <HomePage />
      </div>
    </Router>
  );
}

export default App;
