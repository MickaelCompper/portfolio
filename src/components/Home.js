import React from 'react';
import Img from '../photo CV.png';

const Home = ({ scrollToSection }) => {
    return (
        <section id='home' className="page-section clearfix">
            <div className="container">
                <div className="row align-items-center">
                    {/* Colonne pour le texte */}
                    <div className="col-md-6">
                        <article id='presentation'>
                            <div className="intro text-white">
                                <h4>Bonjour, Je suis Mickaël !</h4>
                                <h1 className='font-weight-bold'>Un développeur web.</h1>
                                <p>Actuellement étudiant en développement web. Je suis animé par l'envie de créer pour échapper au farniente et par une soif d'apprendre.</p>
                                <button className='font-weight-bold btn btn-primary mt-3' onClick={() => scrollToSection('projects')}>Voir mes projets</button>
                            </div>
                        </article>
                    </div>
                    {/* Colonne pour l'image */}
                    <div className="col-md-6 text-center">
                        <img
                            src={Img}
                            id='photo_cv'
                            alt="ma photo"
                            className="img-fluid rounded-circle mt-4"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Home;
