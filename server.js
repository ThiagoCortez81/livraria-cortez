var express = require ('express');
var app = express();
var mongojs = require ('mongojs');
var db = mongojs('listalivro', ['listalivro']); //auxilia selação do banco de dados
var bodyParser = require('body-parser');

/*app.get('/', function (req, res) {
    res.send("Hello world from server.js") // envia mensagem para o navegado
})*/

app.use(express.static(__dirname + "/public")); //chamar index
app.use(bodyParser.json()); //armazena em um JSON

app.get('/listalivro', function (req, res) {
    console.log("I received a GET request")
    
    db.listalivro.find(function (err,docs) {
        console.log(docs);
        res.json(docs);
    });
});

app.post('/listalivro', function (req, res) {
    console.log(req.body);
    db.listalivro.insert(req.body, function(err,doc){
        res.json(doc);
    })
});

app.delete('/listalivro/:id', function (req, res){
    var id= req.params.id;
    console.log(id);
    db.listalivro.remove({_id: mongojs.ObjectId(id)},function (err, doc){
        res.json(doc);
    })
});

app.get('/listalivro/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
    db.listalivro.findOne({_id: mongojs.ObjectId(id)}, function (err, doc){
        res.json(doc);
    })
});

app.put('/listalivro/:id', function (req, res){
    var id = req.params.id;
    console.log(req.body.nome);
    db.listalivro.findAndModify({query: {_id: mongojs.ObjectId(id)},
        update: {$set: {nome: req.body.nome, autor: req.body.autor, tema: req.body.tema}},
        new: true}, function (err, doc) {
            res.json(doc);
        });
});

app.listen (3000);
console.log ("Server running on port 3000");