const express = require('express')
const bodyParser = require('body-parser')
var exphbs = require('express-handlebars');
const MongoClient = require('mongodb').MongoClient;

const app = express()
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}))
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
  res.render('home');
});

var db;
MongoClient.connect('mongodb://localhost:27017/crudApp', (err, database) => {


  if (err) return console.log(err);
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
});
