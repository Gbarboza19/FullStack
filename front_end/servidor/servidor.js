require("colors");
var http = require('http');
var express = require('express' ) ;

var app = express () ;
app.use(express.static('./public'));

var server = http.createServer(app);
server.listen(3000)



console.log("Servidor rodando".rainbow);


//Exemplos de get e post

app.get('/inicio', function(requisicao, resposta){
    resposta.redirect('aula1/index.html')
})

app.post('/inicio', function(requisicao, resposta){
    resposta.redirect('aula1/index.html')
})

app.get('/cadastrar', function(requisicao, resposta){
    let nome = requisicao.query.nome;
    let email = requisicao.query.email;
    let senha = requisicao.query.senha;
    let nascimento = requisicao.query.nascimento;

    console.log(nome, email, senha, nascimento);
})





// <h2>Exemplo de cadastro de usuario</h2>
//<form action="/inicio" method="get">
//<p>Nome: <input type="text" name="nome"></p>
//<p>Email: <input type="email" name="email"></p>
//<p>Senha: <input type="password" name="senha"></p>
//<p>Nascimento <input type="date" name="data"></p>
//<input type="submit" value="cadastrar">
//</form>

//app.get('/cadastrar', function(requisicao, resposta){
//    let nome = requisicao.query.nome;
//    let email = requisicao.query.email;
//    let senha = requisicao.query.senha;
//    let nascimento = requisicao.query.nascimento;

//    console.log(nome, email, senha, nascimento);
//})