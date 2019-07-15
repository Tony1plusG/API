let express = require('express');
let cors = require('cors');
let app = express();
let port = process.env.PORT || 4000;
let bodyParser = require('body-parser');
const books = [];
let bookId = 0;

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true}));
    app
        .use(cors({
            origin: 'http://localhost:8080'
        }))
        .get('/api/books', function(req, res) {
            res.json(books)
        })
        .get('/api/books/:id', function (req, res) {
            let ide = req.params.id;
            console.log(ide);
            let a = books.findIndex(x => String(x.id) === ide);
            res.json(books[a]);
        })
        .post(`/api/books`, function (req, res) {
            let book = {...req.body, id: bookId++};
            books.push(book);
            res.json(book)
        })
        .put('/api/books/:id', function (req, res) {
            let ide = req.params.id;
            let a = books.findIndex(x => String(x.id) === ide);
            books[a].title = `${req.body.title}`;
            books[a].body =  `${req.body.body}`;
            res.json(books);
        })
        .delete('/api/books/:id', function (req, res) {
            let ide = req.params.id;
            let a = books.findIndex(x => String(x.id) === ide);
            books.splice(a, 1);
            res.json(books)
        });

    app.listen(port, function() {
        console.log('Node.js listening on port ' + port)
    });