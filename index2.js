const express = require('express');
const app = express();
const path = require('path');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const pgp = require('pg-promise')();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const hbs = handlebars.create({
    extname: 'hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
  });
  

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname));


const PORT = 8000;

const dbConfig = {
	host: 'localhost',
	port: 5432,
	database: 'recipes_db',
	user: 'postgres',
	password: 'pwd'
};

const db = pgp(dbConfig);


app.get('/', (req,res) => {
    res.render('pages/home',{
        my_title : "Home",
        stylesheet : "../resources/css/style.css",
        message: "Welcome to this Demo"
    })
});

// res.render(<Path to page>, <Data required to render the page>);

app.get('/search', (req, res) => {
    res.render('pages/search',{
        my_title : "Search",
        stylesheet : "./resources/css/style.css"
    })
});

app.get('/userProfile', (req, res) => {
    let rName = req.query.rName;
    let query = `SELECT * FROM users LIMIT 1;`;
    console.log()
    db.any(query)
    .then((rows) => {
        console.log(query);
        res.render('pages/profile',{
            my_title : "Profile",
            stylesheet : "./resources/css/style.css",
            username: rows[0].username,
            email: rows[0].emailid,
            isadmin: rows[0].isadmin
        })
    })
    .catch((error) => {
        res.send({'message' : error});
    })
});

app.get('/getallrecipes', (req, res) => {
    let query = `select * from recipes;`;
    db.any(query)
    .then((rows) => {
        console.log(rows);
        // res.send(rows);
        res.render('pages/recipes',{
            my_title : "All Recipes",
            stylesheet : "./resources/css/style.css",
            data: rows,
            error: ""
        })
    })
    .catch((error) => {
        res.render('pages/recipes',{
            my_title : "All Recipes",
            stylesheet : "./resources/css/style.css",
            rows: [],
            error: error
        })
    })
});

app.get('/getRecipeByName', (req,res) => {
    let rName = req.query.rName;
    let query = `SELECT * FROM recipes WHERE recipename ILIKE '%${rName}%';`;
    console.log();
    db.any(query)
    .then((rows) => {
        console.log(rows);
        res.render('pages/recipes',{
            my_title : "All Recipes",
            stylesheet : "./resources/css/style.css",
            data: rows,
            error: ""
        })
    })
    .catch((error) => {
        console.log(error)
        res.render('pages/recipes',{
            my_title : "All Recipes",
            stylesheet : "./resources/css/style.css",
            rows: [],
            error: error //"Database could not process request"
        })
    })
});

app.get('/test', (req, res) =>{
    res.render('pages/test', {
        my_title : "Test",
        stylesheet: "./resources/css/style2.css"
    })
});

app.listen(PORT, (err) => {
    console.log(`Server is running on port ${PORT}`);
});
