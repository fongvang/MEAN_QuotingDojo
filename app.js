var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './static')));
app.use(express.static(path.join(__dirname, './static/css')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// ----------------MONGOOSE SCHEMA -------------------------------------------
mongoose.connect('mongodb://localhost:27017/quoting_dojo', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

var QuoteSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2},
    quote: {type: String, required: true, minlength: 2}
}, {timestamps: true})

mongoose.model('Quote', QuoteSchema);
var Quote = mongoose.model('Quote');

// ------------ROUTES AND LOCATIONS BELOW---------------------------------------
require('./server/config/routes.js')(app);


// -----------Port Listener------------------
app.listen(8000, function(){
    console.log("Now serving on localhost:8000")
});