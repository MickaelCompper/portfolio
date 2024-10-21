import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const Projects = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [showCommentsModal, setShowCommentsModal] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({
        author: '',
        content: '',
    });
    const [loadingComments, setLoadingComments] = useState(false);
    const [submittingComment, setSubmittingComment] = useState(false);

    const projects = [
        {
            id: 1,
            title: 'Painradis : une boulangerie - pâtisserie',
            imgSrc: 'Painradis.png',
            link: '',
        },
        {
            id: 2,
            title: 'Freshly Inn : Un restaurant',
            imgSrc: 'freshly.png',
            link: 'https://mickaelcompper.github.io/',
        },
        {
            id: 3,
            title: 'Mon portfolio',
            imgSrc: 'portfolio.png',
            link: '/',
        }
    ];

    const handleProjectClick = (project) => {
        setSelectedProject(project);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedProject(null);
    };

    const handleCommentsClick = () => {
        setShowCommentsModal(true);
    };

    const handleCloseCommentsModal = () => {
        setShowCommentsModal(false);
        setComments([]);
        setNewComment({ author: '', content: '' });
    };

    useEffect(() => {
        if (showCommentsModal && selectedProject) {
            fetchComments();
        }
        // eslint-disable-next-line
    }, [showCommentsModal]);

    const fetchComments = async () => {
        setLoadingComments(true);
        try {
            const response = await fetch(`http://localhost:5000/api/comments?projectId=${selectedProject.id}`);
            if (response.ok) {
                const data = await response.json();
                setComments(data);
            } else {
                console.error('Erreur lors de la récupération des commentaires.');
            }
        } catch (error) {
            console.error('Erreur réseau ou serveur :', error);
        }
        setLoadingComments(false);
    };

    const handleInputChange = (e) => {
        setNewComment({ ...newComment, [e.target.name]: e.target.value });
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        setSubmittingComment(true);
        try {
            const response = await fetch('http://localhost:5000/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    projectId: selectedProject.id,
                    author: newComment.author,
                    content: newComment.content,
                }),
            });
            if (response.ok) {
                const savedComment = await response.json();
                setComments([...comments, savedComment]);
                setNewComment({ author: '', content: '' });
            } else {
                console.error('Erreur lors de l\'enregistrement du commentaire.');
            }
        } catch (error) {
            console.error('Erreur réseau ou serveur :', error);
        }
        setSubmittingComment(false);
    };

    return (
        <section id='projects' className='container my-5'>
            <div className='row'>
                {projects.map((project) => (
                    <div key={project.id} className='col-md-4 mb-4'>
                        <div className='card h-100'>
                            <img
                                src={project.imgSrc}
                                className='card-img-top'
                                alt={project.title}
                                onClick={() => handleProjectClick(project)}
                                style={{ cursor: 'pointer' }}
                            />
                            <div className='card-body'>
                                <h5 className='card-title'>{project.title}</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Première modale pour le projet */}
            {selectedProject && (
                <Modal show={showModal} onHide={handleCloseModal} size='lg' centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedProject.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <iframe
                            src={selectedProject.link}
                            width='100%'
                            height='400px'
                            title={selectedProject.title}
                            style={{ border: 'none' }}
                        ></iframe>
                    </Modal.Body>
                    <Modal.Footer>
                        <a
                            href={selectedProject.link}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='btn btn-primary'
                        >
                            Ouvrir dans un nouvel onglet
                        </a>
                        <Button variant='secondary' onClick={handleCommentsClick}>
                            Commentaires
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}

            {/* Deuxième modale pour les commentaires */}
            {selectedProject && (
                <Modal
                    show={showCommentsModal}
                    onHide={handleCloseCommentsModal}
                    size='lg'
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Commentaires pour {selectedProject.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {loadingComments ? (
                            <p>Chargement des commentaires...</p>
                        ) : comments.length > 0 ? (
                            comments.map((comment) => (
                                <div key={comment._id} className='mb-3'>
                                    <h6>{comment.author}</h6>
                                    <p>{comment.content}</p>
                                    <small>{new Date(comment.date).toLocaleString()}</small>
                                    <hr />
                                </div>
                            ))
                        ) : (
                            <p>Aucun commentaire disponible.</p>
                        )}
                        {/* Formulaire pour ajouter un nouveau commentaire */}
                        <Form onSubmit={handleSubmitComment} className='mt-4'>
                            <Form.Group controlId='author'>
                                <Form.Label>Votre nom</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='author'
                                    value={newComment.author}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId='content' className='mt-3'>
                                <Form.Label>Votre commentaire</Form.Label>
                                <Form.Control
                                    as='textarea'
                                    name='content'
                                    rows={3}
                                    value={newComment.content}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Button
                                variant='primary'
                                type='submit'
                                className='mt-3'
                                disabled={submittingComment}
                            >
                                {submittingComment ? 'Envoi en cours...' : 'Envoyer'}
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleCloseCommentsModal}>
                            Fermer
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </section>
    );
};

export default Projects;
