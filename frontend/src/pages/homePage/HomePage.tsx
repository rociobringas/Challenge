import './HomePage.css';
import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <main className="container" style={{ maxWidth: 960, margin: "40px auto" }}>
            <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", marginTop: 24 }}>
                <Link to="/books" className="btn btn-primary">Go to books</Link>
                <Link to="/library" className="btn">Go to library</Link>
                <Link to="/books/new" className="btn btn-outline">Add New Book</Link>
            </div>
        </main>
    );
}