import { Link } from "react-router-dom";
import "./navBar.css";

export function Navbar() {
    return (
        <nav className="navbar">
            <h1 className="logo">My Library</h1>
            <ul className="links">
                <li>
                    <Link to="/books">Books</Link>
                </li>
                <li>
                    <Link to="/library">Library</Link>
                </li>
            </ul>
        </nav>
    );
}