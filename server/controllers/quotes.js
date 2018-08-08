const mongoose = require('mongoose'),
    Quote = mongoose.model('Quote');


function index(req, res){
    res.render('index');
}

function create(req,res){
    console.log("Post Data", req.body);
    var quote = new Quote({name: req.body.name, quote: req.body.quote});
        quote.save(function(err){
        if(err){
            console.log("Something went wrong while handling quote data");
            // if errors, store errors in "errors"
            for(var key in err.errors){
                req.flash('registration', err.errors[key].message);
            }
            res.redirect('/');

        } else{
            console.log("Quote successfully stored!");
            res.redirect('/quotes')
        }
    })
}

function find(req, res){
    Quote.find({}, function(err, quotes){
        if (err){
            console.log("something went wrong");
            console.log(err);
            res.redirect('/');
        }
        else {
            res.render('quotes', {quotes});
        }
    })
}


module.exports = {index, create, find}