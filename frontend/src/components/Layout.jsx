import { Link, Outlet, useLocation } from 'react-router-dom';
import { Wallet, PieChart, PlusCircle, List } from 'lucide-react';

const Layout = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="layout-container">
      <nav className="navbar">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            <Wallet size={24} />
            <span>FinContas</span>
          </Link>
          
          <div className="navbar-links">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
              <PieChart size={18} className="inline-block mr-1" />
              Dashboard
            </Link>
            <Link to="/gastos" className={`nav-link ${isActive('/gastos') ? 'active' : ''}`}>
              <List size={18} className="inline-block mr-1" />
              Meus Gastos
            </Link>
            <Link to="/gastos/novo" className="btn btn-primary">
              <PlusCircle size={18} />
              Novo Gasto
            </Link>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
