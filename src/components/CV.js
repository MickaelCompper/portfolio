import React from 'react';

const CV = () => {

    return (
        <section id='cv' className='text-white container my-5'>
            <div className='row'>
                {/* Colonne de gauche pour les technologies et loisirs */}
                <div className='col-md-6'>
                    <article id='techno'>
                        <h6>Les technologies que je maîtrise :</h6>
                        <p><strong>Front-End :</strong></p>
                        <i className="fa-brands fa-js fa-2x mr-2"></i>
                        <i className="ps-3 fa-brands fa-react fa-2x mr-2"></i>
                        <p className='mt-3'><strong>Back-End :</strong></p>
                        <i className="fa-brands fa-php fa-2x mr-2"></i>
                        <i className="ps-3 fa-brands fa-symfony fa-2x mr-2"></i>
                        <i className="ps-3 fa-brands fa-laravel fa-2x mr-2"></i>
                        <i className="ps-3 fa-brands fa-node fa-2x mr-2"></i>
                        <i className="ps-3 fa-brands fa-python fa-2x mr-2"></i>

                        <article id='loisirs' className='mt-5'>
                            <p><strong>Mes loisirs :</strong></p>
                            <ul>
                                <li>Randonnée dans la nature</li>
                                <li>Lecture</li>
                                <li>Béhourd (combat médiéval)</li>
                                <li>A.M.H.E. (escrime ancienne)</li>
                            </ul>
                        </article>
                    </article>
                </div>

                {/* Colonne de droite pour le parcours professionnel */}
                <div className='col-md-6'>
                    <article id='job'>
                        <a href='CV COMPPER Mickaël Dév Web.pdf' download={true} title="Téléchargez mon CV">
                            <i className="fa-solid fa-file-pdf fa-2x"></i>
                        </a>
                        <div className='mt-4'>
                            <p><strong>Octobre 2023 - Novembre 2024 :</strong></p>
                            <p>Alternance Paris Habitat - Epitech</p>
                            <p><strong>Missions / Technologies :</strong></p>
                            <ul>
                                <li>Administration Salesforce</li>
                                <li>Copado Robotic Testing</li>
                                <li>Angular, NodeJS, LWC</li>
                                <li>Jira, Easy Vista</li>
                            </ul>
                        </div>
                        <div className='mt-4'>
                            <p><strong>Novembre 2022 - Octobre 2023 :</strong></p>
                            <p>Formation Web@cadémie d'Epitech</p>
                            <p><strong>J'y ai appris :</strong></p>
                            <ul>
                                <li>Création de site internet et développement d'applications web</li>
                                <li>PHP (Laravel, Symfony)</li>
                                <li>JavaScript (React, ExpressJS, NodeJS)</li>
                                <li>Kotlin</li>
                            </ul>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    )
}
export default CV;
