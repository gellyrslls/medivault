import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import Login from './pages/login';
import Register from './pages/register';
import Nav from './pages/nav';
import Products from './pages/products';  
import Supplier from './pages/supplier';  
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />  
          <Route path="/register" element={<Register />} />  
          <Route path="/nav" element={<Nav />} />  
          <Route path="/products" element={<Products />} />  
          <Route path="/supplier" element={<Supplier />} />  
        </Routes>
      </div>
    </Router>
  );
}

export default App;