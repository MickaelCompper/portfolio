const express = require('express');
const path = require('path'); // Importer le module 'path'
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
require('dotenv').config();

// Création de l'application Express
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connexion à MongoDB
const mongoUrl = process.env.SCALINGO_MONGO_URL || process.env.MONGO_URL;

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connecté à MongoDB'))
    .catch((error) => console.error('Erreur de connexion à MongoDB :', error));

// Définition du schéma et du modèle Comment
const CommentSchema = new mongoose.Schema({
    projectId: Number,
    author: String,
    content: String,
    date: { type: Date, default: Date.now },
});

const Comment = mongoose.model('Comment', CommentSchema);

// Routes API (doivent être définies avant le code qui sert les fichiers statiques)

// Route pour récupérer les commentaires
app.get('/api/comments', async (req, res) => {
    const projectId = parseInt(req.query.projectId);
    try {
        const comments = await Comment.find({ projectId });
        res.json(comments);
    } catch (error) {
        console.error('Erreur lors de la récupération des commentaires :', error);
        res.status(500).send('Erreur du serveur');
    }
});

// Route pour enregistrer un commentaire
app.post('/api/comments', async (req, res) => {
    const { projectId, author, content } = req.body;
    if (!projectId || !author || !content) {
        return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }
    try {
        const newComment = new Comment({ projectId, author, content });
        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement du commentaire :', error);
        res.status(500).send('Erreur du serveur');
    }
});

// Route pour envoyer un e-mail
app.post('/api/send-email', async (req, res) => {
    const { name, email, message, subject } = req.body;

    // Validation des champs requis
    if (!name || !email || !message || !subject) {
        return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // Contenu de l'e-mail
    let mailOptions = {
        from: '',
        to: process.env.EMAIL_TO,
        subject: `${subject}`,
        text: message,
        html: `
        <p>Nom : ${name}</p>
        <p>Email : ${email}</p>
        <p>Message : <br>${message}</p>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'E-mail envoyé avec succès.' });
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
        res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'e-mail.' });
    }
});

// Servir les fichiers statiques de l'application React
app.use(express.static(path.join(__dirname, 'client/build')));

// "Catchall" handler : pour toutes les routes qui ne correspondent pas aux routes API, renvoyer index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Lancement du serveur
app.listen(port, () => {
    console.log(`Le serveur est lancé sur le port ${port}`);
});
