import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Home from './pages/Home';
import Error from './pages/Error';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/signup" element={ <Signup /> } />

        <Route path="/error" element={ <Error /> } />
      </Routes>
    </div>
  );
}

export default App;
