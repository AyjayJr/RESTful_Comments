const express = require('express');
const path = require('path');
const app = express();

// This line parses any data that comes from a url
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// An object that represents a db of comments
const comments = [
	{
		id: 1,
		username: 'Todd',
		comment: 'That is so funny!'
	},
	{
		id: 2,
		username: 'Anthony',
		comment: 'What am I looking at!?'

	},
	{
		id: 3,
		username: 'Potent',
		comment: 'Anything is possible.'

	},
	{
		id: 4,
		username: 'Richie',
		comment: 'I am extrememly hungry!'

	},

];

// Our main page for our comments resource
app.get('/comments', (req, res) => {
	// Index is a common term used for the main page of a resource
	// Usually shows all of a certain resource on index
	res.render('comments/index', { comments });
})

// Pushes new comment from a form on /new to our "database"
app.post('/comments', (req, res) => {
	const { username, comment } = req.body;
	// In the real world this data would be added to a db
	comments.push({ username, comment });
	// Redirect sends a get req to page when post is finished
	res.redirect('/comments');
})


// Show route to view particular comment based on id
app.get('/comments/:id', (req, res) => {
	const { id } = req.params;
	const comment = comments.find(c => c.id === parseInt(id));
	res.render('comments/show', { comment });
})

// A form to create a new comment
app.get('/comments/new', (req, res) => {
	res.render('comments/new');
})

app.get('/tacos', (req, res) => {
	res.send('Get /tacos response');
})

app.post('/tacos', (req, res) => {
	console.log(req.body);
	res.send('POST /tacos response');
})

app.listen(3000, () => {
	console.log('listening on port 3000!');
})
