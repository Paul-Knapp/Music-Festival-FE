import { NavLink } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" activeClassName="active">
            Users
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
