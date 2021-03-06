var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
const SequelizeStore = 
    require('connect-session-sequelize')(session.Store)
const models = require('./models')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const languageRouter = require('./routes/language')
const proficienciesRouter = require('./routes/proficiencies')
const messageRouter = require('./routes/message')
const db = require('./models')

var app = express();

const store = new SequelizeStore({db: models.sequelize})
app.use(
    session({
        secret: 'pancakes',
        resave: false,
        saveUninitialized:false,
        store:store,
    })
)
store.sync()


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/language', languageRouter)
app.use('/api/v1/proficiencies', proficienciesRouter)
app.use('/api/v1/message', messageRouter)




module.exports = app;
