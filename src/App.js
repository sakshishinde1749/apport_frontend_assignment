import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import KanbanBoard from './components/KanbanBoard/KanbanBoard';
import Navbar from './components/Navbar/Navbar';
import { KanbanProvider } from './context/KanbanContext';

function App() {
  return (
    <KanbanProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<KanbanBoard />} />
          </Routes>
        </div>
      </Router>
    </KanbanProvider>
  );
}

export default App;
