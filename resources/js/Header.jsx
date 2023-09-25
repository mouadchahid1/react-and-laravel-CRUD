import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const Header = () => { 
    const location = useLocation() ;
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">Laracrud App</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">Location</Link>
          <Link className={`nav-link ${location.pathname === '/create' ? 'active' : ''}`} to="/create">Create</Link>
          <Link className="nav-link" to="#">Pricing</Link>
          <Link className="nav-link disabled" aria-disabled="true">Disabled</Link>
        </div>
      </div>
    </div>
  </nav>
  )
}

export default Header;