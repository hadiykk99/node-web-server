const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

// app.use((req, res, next) =>{
//     res.render('maintenance');
// });

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n', err =>{
        if(err){
            console.log('error happend');
        }
    });
    next();
});
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home',{
        pageTitle: "Home Page",
        test: "hello",
        currentYear: new Date().getFullYear()
    })
});

app.get('/about', (req, res) => {
       res.render('about', {
           pageTitle: "About Page",
           currentYear: new Date().getFullYear()
       });
});

// app.get('/maintenance', (req, res) =>{
//     res.render('maintenance');
// });

app.get('/bad', (req, res) => {
    res.send ({
        errorMessage:"unable to blabla"
    })
});
app.listen(3000, () =>{
    console.log("server has been starting at port 3000");
});