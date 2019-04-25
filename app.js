const express = require('express');
const app = express();
const path = require('path');
const port = 8000;

const session = require('express-session');
const FileStore = require('session-file-store')(session);

app.use(session({
    store: new FileStore(),
    secret:"asdlkfjaldjsdajhfalksjdfhalksdjdhsdkjf",
    resave: false,
    saveUninitialized:false
}));

const indexRouter = require('./routes/index');

app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use('/',express.static('public'));

app.set('views',path.join(__dirname,"views"));
app.set('view engine', 'pug');

app.use('/', indexRouter);


app.listen(port);
