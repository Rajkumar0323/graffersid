import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [search, setSearch] = useState('');

    // Get initial search value from URL on component mount
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const searchValue = searchParams.get('search') || '';
        setSearch(searchValue);
    }, [location.search]);

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/?search=${encodeURIComponent(search)}`);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm" style={{ position: "sticky", top: "0px", zIndex: "999" }}>
            <div className="container-fluid" style={{ maxWidth: "1300px" }}>
                {/* Logo */}
                <Link to={"/"} style={{ textDecoration: "none" }}>
                    <div className="navbar-brand d-flex align-items-center">
                        <div
                            className="rounded-circle d-flex align-items-center justify-content-center me-2 bg-theme"
                            style={{
                                width: "32px",
                                height: "32px",
                            }}
                        >
                            <i className="bi bi-star-fill text-white"></i>
                        </div>
                        <span className="fs-4">
                            Review<span className="text-theme">&</span>
                            <b>RATE</b>
                        </span>
                    </div>
                </Link>

                {/* Search Bar */}
                <form onSubmit={handleSubmit} className="flex-grow-1 mx-4" style={{ maxWidth: "400px" }}>
                    <div className="position-relative">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                            style={{ paddingRight: "40px" }}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="btn position-absolute top-50 end-0 translate-middle-y me-3 p-0"
                        >
                            <i className="bi bi-search text-muted"></i>
                        </button>
                    </div>
                </form>

                {/* Auth Buttons */}
                <div className="d-flex align-items-center">
                    <button className="btn btn-link text-dark text-decoration-none me-3 fw-medium">
                        SignUp
                    </button>
                    <button className="btn btn-link text-dark text-decoration-none fw-medium">
                        Login
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
