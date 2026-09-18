import { Link, NavLink } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget';

const NavBar = () => {
    return (
        <header className="navbar-header">
            <Link to="/" className="brand">
                <h1>Folklorika 🪗</h1>
            </Link>
            <nav className="nav-links">
                <NavLink to="/category/cuerdas" className={({ isActive }) => isActive ? 'active-link' : ''}>
                    Cuerdas & Madera
                </NavLink>
                <NavLink to="/category/percusion" className={({ isActive }) => isActive ? 'active-link' : ''}>
                    Parches & Percusión
                </NavLink>
                <NavLink to="/category/estudio" className={({ isActive }) => isActive ? 'active-link' : ''}>
                    Estudio & Sesiones
                </NavLink>
            </nav>
            <CartWidget />
        </header>
    );
};

export default NavBar;