const express = require('express');
const path = require('path');
const app = express();
const methodOverride = require('method-override'); // Allows us to send patch from forms
const { v4: uuidv4 } = require('uuid'); // UUID creates unique identifiers

// This line parses any data that comes from a url
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// An object that represents a db of comments
const comments = [
	{
		id: uuidv4(),
		username: 'Todd',
		comment: 'That is so funny!'
	},
	{
		id: uuidv4(),
		username: 'Anthony',
		comment: 'What am I looking at!?'

	},
	{
		id: uuidv4(),
		username: 'Potent',
		comment: 'Anything is possible.'

	},
	{
		id: uuidv4(),
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

// A form to create a new comment
app.get('/comments/new', (req, res) => {
	res.render('comments/new');
})

// Pushes new comment from a form on /new to our "database"
app.post('/comments', (req, res) => {
	const { username, comment } = req.body;
	// In the real world this data would be added to a db
	comments.push({ username, comment, id: uuidv4() });
	// Redirect sends a get req to page when post is finished
	res.redirect('/comments');
})

// Show route to view particular comment based on id
app.get('/comments/:id', (req, res) => {
	const { id } = req.params; // pull uuid from request 
	const comment = comments.find(c => c.id === id); // Find comment with matching id
	res.render('comments/show', { comment }); 
})

app.get('/comments/:id/edit', (req, res) => {
	const { id } = req.params;
	const comment = comments.find(c => c.id === id);
	res.render('comments/edit', { comment });
})

// Patch request is used to partially modify a resource
// Forms in browser can only send get or post requests
// We will use method-override to enable this functionality
app.patch('/comments/:id', (req, res) => {
	const { id } = req.params;
	const newCommentText = req.body.comment;
	const foundComment = comments.find(c => c.id === id);
	foundComment.comment = newCommentText;
	res.redirect('/comments');
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
