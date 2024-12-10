import { Link } from 'react-router-dom';
import './nav.css';

function Nav() {
  return (
    <div className="page-container">
      <div className="nav-container">
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <span className="nav-link" style={{ color: 'white', fontWeight: 'bold' }} onClick={(e) => e.preventDefault()}>Home</span>
            </li>
            <li className="nav-item">
              <Link to="/products">Products</Link>
            </li>
            <li className="nav-item">
              <Link to="#">Orders</Link>
            </li>
            <li className="nav-item">
              <Link to="/supplier">Supplier</Link> 
            </li>
            <li className="nav-item">
              <Link to="#">Reports</Link>
            </li>
            <li className="nav-item">
              <Link to="/">Logout</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="main-content">
        <div className="logo-container">
          <img src="./logo.png" alt="Logo" className="logo" />
        </div>
      </div>
    </div>
  );
}

export default Nav;