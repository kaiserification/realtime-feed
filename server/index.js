const express = require('express');
const cors = require('cors');
const Pusher = require('pusher');

require('dotenv').config( { path: 'variable.env' });

const app = express();

const port = process.env.PORT || 3000;

let pusher = new Pusher({
	appId: process.env.PUSHER_APP_ID,
	key: process.env.PUSHER_APP_KEY,
	secret: process.env.PUSHER_APP_SECRET,
	useTLS: process.env.PUSHER_APP_SECURE,
	cluster: process.env.PUSHER_APP_CLUSTER
});

app.use(cors());
app.use(express.json());

const titles = [];

app.get('/', (req, res) => { 
	res.status(200).send({ service: 'pusher activity feed API...'});
});

app.post('/submit', (req, res) => {
	const title = req.body.title;
	const body  = req.body.content;
	const category = req.body.category;

	if(title === undefined) {
		res.status(400).send({ message: 'Le titre ne doit pas être vide.', status: false });
		return;
	}
	if(body === undefined) {
		res.status(400).send({ message: 'Le contenu ne doit pas être vide.', status: false });
		return;
	}
	if(category == undefined) {
		res.status(400).send({message: 'La catégorie ne doit pas être vide.', status: false});
		return;
	}

	if(title.length <= 5) {
		res.status(400).send({ message: 'le titre est trop court (min: 5 caractères).', status: false });
		return;
	}
	if(body.length <= 6) {
		res.status(400).send({ message: 'Le contenu est trop court (min: 6 caractères)', status: false });
		return;
	}

	const index = titles.findIndex(element => { element === title});

	if(index >= 0) {
		res.status(400).send({ message: 'Le titre existe déjà', status: false});
	}
	titles.push(title.trim());
	pusher.trigger('realtime-feeds', 'posts', {
		title: title.trim(),
		body: body.trim(),
		time: new Date(),
		category: category,
	});

	res.status(200).send({ message: 'L\'article a bien été créé...', status: true});
});

app.listen(port, () => { console.log(` l'API tourne sur le port ${port}...`) })