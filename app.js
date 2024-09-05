/****************************************************************
 * Objetivo: Arquivo responsavel pelos endpoints
 * Data: 03/09/2024
 * Autor: Ricardo
 * Versão: 1.0
 ****************************************************************/

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use((request, response, next) =>{

    // Permite especificar quem podera acessar a API ('*' = Liberar acesso público, 'IP' = Liberar acesso apenas para aquela maquina);
    response.header('Access-Control-Allow-Origin', '*')

    // Permite especificar como a API, sera requisitada ('GET', 'POST', 'PUT' e 'DELETE')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    // Ativa as confgurações de cors
    app.use(cors())


    next()
})

/*********************** Import dos arquivos de controller do projeto ***********************************/
const controllerAluno = require('./controller/controller_aluno.js')
const controllerMateria = require('./controller/controller_materia.js')

/*******************************************************************************************************/

// Criando um objeto para controlar a chegada dos dados da requisição em formato JSON
const bodyParserJSON = bodyParser.json()


//       --------------------   CRUD ALUNOS  ---------------------        //


    // -> EndPoint: Versão 2.0 - Retorna os dados de produtos do Banco de Dados
    app.get('/v1/studyfy/alunos', cors(), async function(request, response){

        // -> Chama a função da controller para retornar todos os filmes
        let dadosAlunos = await controllerAluno.getListarAluno()

        // -> validação para verificar se existem dados a serem retornados
        response.status(dadosAlunos.status_code)
        response.json(dadosAlunos)
    })

    app.get('/v1/studyfy/materias', cors(), async function(request, response){

        // -> Chama a função da controller para retornar todos os filmes
        let dadosMaterias = await controllerMateria.getListarMaterias()

        // -> validação para verificar se existem dados a serem retornados
        response.status(dadosMaterias.status_code)
        response.json(dadosMaterias)
    })
    
    app.get('/v1/studyfy/alunos/materias/:id', cors(), async function(request, response){

        let idAluno = request.params.id

        let dadosMaterias = await controllerMateria.getListarMateriasByIdAluno(idAluno)

        // -> validação para verificar se existem dados a serem retornados
        response.status(dadosMaterias.status_code)
        response.json(dadosMaterias)
    })

    // // EndPoint: ele retorna os dados pelo id
    app.get('/v1/studyFy/aluno/:id', cors(), async function(request, response){

        // Recebe o id da requisição
        let idAluno = request.params.id
        // Encaminha o ID para a controller buscar o Filme
        let dadosAluno = await controllerAluno.getBuscarAlunoId(idAluno)

        
        response.status(dadosAluno.status_code)
        response.json(dadosAluno)
    })

    // //EndPoint: Ele insere dados sobre o filme
    app.post('/v1/studyFy/alunos', cors(), bodyParserJSON, async function(request, response){

        // Recebe o content-type da requisição
        let contentType = request.headers['content-type']

        //Recebe todos os dados encaminhados na requisição pelo Body
        let dadosBody = request.body

        //Encaminha os dados para a controller enviar para o DAO
        let resultDadosNovoAluno = await controllerAluno.setInserirNovoAluno(dadosBody, contentType)
        
        response.status(resultDadosNovoAluno.status_code)
        response.json(resultDadosNovoAluno)
    })

     //EndPoint: Ele deleta os dados pelo id 
    app.delete('/v1/studyFy/alunos/:id', cors(), async function(request, response, next){
        let idAluno = request.params.id

        let dadosAluno = await controllerAluno.setExcluirAluno(idAluno)

        response.status(dadosAluno.status_code)
        response.json(dadosAluno)
    })

     app.put('/v1/studyFy/alunos/:id', cors(), bodyParserJSON, async function(request, response){
         let contentType = request.headers['content-type']
         let dadosBody = request.body
         let idAluno = request.params.id

         let dadosAluno = await controllerAluno.setAtualizarAluno(idAluno, dadosBody, contentType)

       response.status(dadosAluno.status_code)
       response.json(dadosAluno)
     })


     app.listen('8080', function(){
        console.log('API funcionando!!')
    })



  