const express = require("express");
const app = express();
const handlebars = require ('express-handlebars')
const bodyParser = require ('body-parser')
const Post = require('./Models/Post')


// Configs  
    // Template Engine
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')
    
    // Body Parser config
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())

//rotas

    app.get('/', function(req, res){
        Post.findAll({order: [['id', 'DESC']]}).then(function(posts){
            res.render('home', {posts: posts})
            
        })
    })
    
    //exibe o formulario
    app.get('/cad', function (req, res) {       
        res.render('formulario')
    })
    
    app.post('/add',function(req, res){
        Post.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        }).then(function(){
            res.redirect('/')
        }).catch(function(){
            res.send("Erro: " + erro)
        })
    })
    
    app.get('/deletar/:id', function(req, res){
        Post.destroy({where: {'id': req.params.id}
            }).then(function(){
                res.redirect('/'),
                console.log("Deletado com sucesso")
            }).catch(function(){
                res.send("Erro ao deletar")
            })
    })
    app.get('/editar/:id', function(req, res) {
        id = req.params.id;
        res.render('editar')
    })
    
    app.post('/editar', function(req, res){
        Post.update({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo},
            {
                where: {id: id},
            }).then(function()  {
                res.redirect('/')
            })
              
        })

app.listen(8081, function(){
    console.log("server ON")
});
