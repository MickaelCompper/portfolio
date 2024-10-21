import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        subject: ''
    });

    const [errors, setErrors] = useState({});
    const [submitStatus, setSubmitStatus] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        let formErrors = {};
        let isValid = true;

        if (!formData.name.trim()) {
            isValid = false;
            formErrors.name = 'Le nom est requis.';
        }

        if (!formData.email.trim()) {
            isValid = false;
            formErrors.email = 'Le courriel est requis.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            isValid = false;
            formErrors.email = 'Le courriel n\'est pas valide.';
        }

        if (!formData.message.trim()) {
            isValid = false;
            formErrors.message = 'Le message est requis.';
        }

        if (!formData.subject.trim()) {
            isValid = false;
            formErrors.subject = 'Le sujet est requis.';
        }

        setErrors(formErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const response = await fetch('http://localhost:5000/api/send-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    setSubmitStatus('Message envoyé avec succès.');
                    setFormData({ name: '', email: '', message: '', subject: '' });
                    setErrors({});
                } else {
                    setSubmitStatus('Erreur lors de l\'envoi du message.');
                }
            } catch (error) {
                console.error('Erreur réseau ou serveur :', error);
                setSubmitStatus('Erreur réseau ou serveur.');
            }
        }
    };

    return (
        <section id='contact' className='container my-5'>
            <div className='row'>
                {/* Colonne pour l'iframe */}
                <div className='col-md-6 mb-4 mb-md-0'>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25104.34804650978!2d2.2886911201745357!3d48.79803533393082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e670dd60f1efbd%3A0x26a87186a5fb0595!2s92220%20Bagneux!5e1!3m2!1sfr!2sfr!4v1728384352035!5m2!1sfr!2sfr"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title='Mon emplacement'
                        style={{ border: 0, width: '100%', height: '400px' }}
                    ></iframe>
                </div>
                {/* Colonne pour le formulaire */}
                <div className='col-md-6'>
                    <article id='message'>
                        <h6 className='text-white'>Envoyez-moi un message</h6>
                        {submitStatus && (
                            <div className="alert alert-info">
                                {submitStatus}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} noValidate>
                            <div className='form-group'>
                                <label htmlFor='name'>Votre nom complet</label>
                                <input
                                    id='name'
                                    type='text'
                                    name='name'
                                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                    placeholder="Votre nom complet"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                            </div>
                            <div className='form-group'>
                                <label htmlFor='email'>Votre courriel</label>
                                <input
                                    id='email'
                                    type='email'
                                    name='email'
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    placeholder="Votre courriel"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>
                            <div className='form-group'>
                                <label htmlFor='subject'>Le sujet</label>
                                <label htmlFor='subject'>Sujet</label>
                                <input
                                    id='subject'
                                    name='subject'
                                    className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
                                    placeholder="Sujet"
                                    rows="5"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                ></input>
                                {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
                            </div>
                            <div className='form-group'>
                                <label htmlFor='message'>Message</label>
                                <textarea
                                    id='message'
                                    name='message'
                                    className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                                    placeholder="Message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                                {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                            </div>
                            <button type="submit" className="btn btn-primary mt-3">
                                Envoyer
                            </button>
                        </form>
                    </article>
                </div>
            </div>
        </section>
    );
};

export default Contact;
