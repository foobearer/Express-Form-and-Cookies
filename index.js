const express = require('express');
const app = express();
const port = 3000;

const cookieparser = require('cookie-parser');
const path = require('path');
const helmet = require('helmet');
// const { request, response } = require('express');

app.use(helmet());
app.use(cookieparser());

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (request, response, next) => {
    response.send('Sanity check');
});

app.get('/login', (request, response, next) => {
    //login string is referencing login.ejs file
    response.render('login');
});

//this is the path we defined inside form
app.post('/process_login', (request, response, next) => {
    //request.body will take data from the form
    const { username, password } = request.body;
    const userdetails = {
        username: 'Joycee',
        password: '1234'
    }
    if (username === userdetails.username && password === userdetails.password) {
        //saving data to cookies
        response.cookie('username', username);
        response.redirect('/welcome');
    } else {
        response.redirect('/login?msg=fail')
    }

    // response.json({ username, password });
});

app.get('/welcome', (request, response, next) => {
    //response.send will pass string to the page
    // response.send(`welcome`);

    //this will reder welcome page.ejs page inside /views
    response.render('welcome', {
        username: request.cookies.username
    });
    // console.log(response);
});

app.get('/logout', (request, response, next) => {
    response.clearCookie('username');
    response.redirect('/login');
});

app.listen(port);