const express = require('express');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const comments = [ 
  {
    user: 'Todd',
    text: 'That is so funny!'

  },
  {
    user: 'Anthony',
    text: 'What am I looking at!?'

  },
  {
    user: 'Potent',
    text: 'Anything is possible.'

  },
  {
    user: 'Richie',
    text: 'I am extrememly hungry!'

  },

];

app.get('/comments', (req, res) => {
  // Index is a common term used for the main page of a resource
  // Usually shows all of a certain resource on index
  res.render('comments/index', { comments });  
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
