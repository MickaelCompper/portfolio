import React from 'react';

const Header = ({ scrollToSection }) => {

    return (
        <header className='fixed-top'>
            <nav className="navbar navbar-expand-lg navbar-dark py-lg-4" id="mainNav">
                <div className="container">
                    {/* Logo ou Nom de la marque */}
                    <h5 className="navbar-brand" id="name">Mickaël COMPPER</h5>
                    {/* Bouton pour le menu mobile */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {/* Contenu du menu */}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <nav className='navbar-expand-lg navbar-dark mainNav'>
                            <ul className="navbar-nav mx-auto">
                                <li className="nav-item px-lg-4">
                                    <a className="nav-link text-uppercase" onClick={() => scrollToSection('home')}>Accueil</a>
                                </li>
                                <li className="nav-item px-lg-4">
                                    <a className="nav-link text-uppercase" onClick={() => scrollToSection('projects')}>Projets</a>
                                </li>
                                <li className="nav-item px-lg-4">
                                    <a className="nav-link text-uppercase" onClick={() => scrollToSection('about')}>À propos</a>
                                </li>
                                <li className="nav-item px-lg-4">
                                    <a className="nav-link text-uppercase" onClick={() => scrollToSection('contact')}>Contact</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#reseaux"
                        aria-controls="reseaux"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="reseaux">
                        <nav className='navbar-expand-lg navbar-dark mainNav'>
                            <ul className="navbar-nav">
                                <li className="nav-item px-lg-4">
                                    <a className="nav-link text-uppercase" href='https://github.com/MickaelCompper' target='_blank' rel="noreferrer">
                                        <i className="fa-brands fa-github"></i>
                                    </a>
                                </li>
                                <li className="nav-item px-lg-4">
                                    <a className="nav-link text-uppercase" href='https://www.linkedin.com/in/mickael-compper/' target='_blank' rel="noreferrer">
                                        <i className="fa-brands fa-linkedin"></i>
                                    </a>
                                </li>
                                <li className="nav-item px-lg-4">
                                    <a className="nav-link text-uppercase" href='mailto:Mickael.Compper@proton.me'>
                                        <i className="fa-solid fa-envelope"></i>
                                    </a>
                                </li>
                                <li className="nav-item px-lg-4">
                                    <a className="nav-link text-uppercase" href='tel:0695962559'>
                                        <i className="fa-solid fa-phone"></i>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </nav >
        </header >
    )
}

export default Header;
