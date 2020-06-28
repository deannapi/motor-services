const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const helper = require('./utils/helper')
const hbs = exphbs.create({})

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'alphaDog',
    cookie: {maxAge:600000},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

const app = express();
const PORT = process.env.PORT || 3001;

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);

sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => {
        console.log('Now listening!');
    });
});