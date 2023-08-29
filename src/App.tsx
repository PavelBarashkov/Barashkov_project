import NavBar from './components/NavBar/NavBar';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './components/AppRouter';
import './App.css';

function App() {
  return (
    <BrowserRouter>
        <div>
            <NavBar />
            <AppRouter/>
        </div>
    </BrowserRouter>
  );
}

export default App;
    