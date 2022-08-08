const express = require('express');
const app = express();
const mongoose = require('mongoose')
const hbs = require('hbs')
const path = require('path')
const PORT = process.env.PORT || 8000;
const userModel = require('./model/user.model')
const passport = require('passport')
const expressSession = require('express-session')
const cookieParser = require('cookie-parser')
const cookie = { secret: "secret",maxAge:3600000, resave: true, saveUninitialized: true }

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + '/public'));
mongoose.connect('mongodb://localhost:27017/members').then(() => {
    console.log("Databases connected");
})

app.set('views', path.join(__dirname, '/templates/views'));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index')
});
app.post('/register', (req, res) => {
    userModel(req.body).save()
    res.redirect('/')
})
app.set('trust proxy', 1);
app.use(cookieParser('secret'))
app.use(expressSession(cookie));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', require('./routes/index'));
app.listen(PORT, () => {
    console.log("server listening in port " + PORT);
})
