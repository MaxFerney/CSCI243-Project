const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');
const port = 8000;

const indexRouter = require('./routes/index');

app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use('/',express.static('public'));

app.set('views',path.join(__dirname,"views"));
app.set('view engine', 'pug');

app.use('/', indexRouter);


app.listen(port);
