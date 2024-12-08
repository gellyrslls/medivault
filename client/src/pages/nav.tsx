import './nav.css';  

function Nav() {
  return (
    <div className="page-container">
      <div className="nav-container">
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#">Home</a>
            </li>
            <li className="nav-item">
              <a href="#">Products</a>
            </li>
            <li className="nav-item">
              <a href="#">Orders</a>
            </li>
            <li className="nav-item">
              <a href="#">Inventory</a>
            </li>
            <li className="nav-item">
              <a href="#">Reports</a>
            </li>
            <li className="nav-item">
              <a href="#">Logout</a>
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