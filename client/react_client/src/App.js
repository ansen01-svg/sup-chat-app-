import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './pages/protected_route';
import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';

function App() { 
  return (
    <Router>
      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path='/register' element={ <Register /> } />
        <Route path='/login' element={ <Login /> } />
      </Routes>
    </Router>
  );
}

export default App;
