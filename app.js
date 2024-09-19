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
const controllerProfessor = require ('./controller/controller_professor.js')
const controllerMentor = require ('./controller/controller_mentor.js')
const controllerGrupoMentoria = require ('./controller/controller_grupoMentoria.js')
const controllerMembros = require ('./controller/controller_membros.js')

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


     //       --------------------   CRUD PROFESSORES  ---------------------        //


    // -> EndPoint: Versão 2.0 - Retorna os dados de produtos do Banco de Dados
    app.get('/v1/studyfy/professores', cors(), async function(request, response){

        // -> Chama a função da controller para retornar todos os filmes
        let dadosProfessores = await controllerProfessor.getListarProfessor()

        // -> validação para verificar se existem dados a serem retornados
        response.status(dadosProfessores.status_code)
        response.json(dadosProfessores)
    })

    // // EndPoint: ele retorna os dados pelo id
    app.get('/v1/studyFy/professor/:id', cors(), async function(request, response){

        // Recebe o id da requisição
        let idProfessor = request.params.id
        // Encaminha o ID para a controller buscar o Filme
        let dadosProfessores = await controllerProfessor.getBuscarProfessorId(idProfessor)

        
        response.status(dadosProfessores.status_code)
        response.json(dadosProfessores)
    })

    // //EndPoint: Ele insere dados sobre o filme
    app.post('/v1/studyFy/professores', cors(), bodyParserJSON, async function(request, response){

        // Recebe o content-type da requisição
        let contentType = request.headers['content-type']

        //Recebe todos os dados encaminhados na requisição pelo Body
        let dadosBody = request.body

        //Encaminha os dados para a controller enviar para o DAO
        let resultDadosNovoProfessor = await controllerProfessor.setInserirNovoProfessor(dadosBody, contentType)
        
        response.status(resultDadosNovoProfessor.status_code)
        response.json(resultDadosNovoProfessor)
    })

     //EndPoint: Ele deleta os dados pelo id 
    app.delete('/v1/studyFy/professores/:id', cors(), async function(request, response, next){
        let idProfessor = request.params.id

        let dadosProfessores = await controllerProfessor.setExcluirProfessor(idProfessor)

        response.status(dadosProfessores.status_code)
        response.json(dadosProfessores)
    })

     app.put('/v1/studyFy/professores/:id', cors(), bodyParserJSON, async function(request, response){
         let contentType = request.headers['content-type']
         let dadosBody = request.body
         let idProfessor = request.params.id

         let dadosProfessores = await controllerProfessor.setAtualizarProfessor(idProfessor, dadosBody, contentType)

       response.status(dadosProfessores.status_code)
       response.json(dadosProfessores)
     })


      //       --------------------   CRUD MATERIA  ---------------------        //

      app.get('/v1/studyfy/materia', cors(), async function(request, response){

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


     // //EndPoint: Ele insere dados sobre o filme
     app.post('/v1/studyFy/materias', cors(), bodyParserJSON, async function(request, response){

        // Recebe o content-type da requisição
        let contentType = request.headers['content-type']

        //Recebe todos os dados encaminhados na requisição pelo Body
        let dadosBody = request.body

        //Encaminha os dados para a controller enviar para o DAO
        let resultDadosNovaMateria = await controllerMateria.setInserirNovaMateria(dadosBody, contentType)
        
        response.status(resultDadosNovaMateria.status_code)
        response.json(resultDadosNovaMateria)
    })

     //EndPoint: Ele deleta os dados pelo id 
    app.delete('/v1/studyFy/materias/:id', cors(), async function(request, response, next){
        let idMateria = request.params.id

        let dadosMaterias = await controllerMateria.setExcluirMateria(idMateria)

        response.status(dadosMaterias.status_code)
        response.json(dadosMaterias)
    })

     app.put('/v1/studyFy/materias/:id', cors(), bodyParserJSON, async function(request, response){
         let contentType = request.headers['content-type']
         let dadosBody = request.body
         let idMateria = request.params.id

         let dadosMaterias = await controllerMateria.setAtualizarMateria(idMateria, dadosBody, contentType)

       response.status(dadosMaterias.status_code)
       response.json(dadosMaterias)
     })

     app.listen('8080', function(){
        console.log('API funcionando!!')
    })


 //       --------------------   CRUD MENTOR  ---------------------        //



 app.get('/v1/studyfy/mentor', cors(), async function(request, response){

        // -> Chama a função da controller para retornar todos os filmes
        let dadosMentor = await controllerMentor.getListarMentores()

        // -> validação para verificar se existem dados a serem retornados
        response.status(dadosMentor.status_code)
        response.json(dadosMentor)
    })

    app.get('/v1/studyfy/aluno/mentor/:id', cors(), async function(request, response){

        let idAlunoMentor = request.params.id

        let dadosAlunosMentores = await controllerAluno.getListarAlunosMentores(idAlunoMentor)

        // -> validação para verificar se existem dados a serem retornados
        response.status(dadosAlunosMentores.status_code)
        response.json(dadosAlunosMentores)
    })

    app.get('/v1/studyfy/professor/mentor/:id', cors(), async function(request, response){

        let idProfessorMentor = request.params.id

        let dadosProfessoresMentores = await controllerProfessor.getListarProfessoresMentores(idProfessorMentor)

        // -> validação para verificar se existem dados a serem retornados
        response.status(dadosProfessoresMentores.status_code)
        response.json(dadosProfessoresMentores)
    })



// --------------------   CRUD GRUPODE DE MENTORIA  ---------------------        

app.get('/v1/studyfy/mentorias', cors(), async function(request, response) {
    try {
        // Chama a função da controller para retornar todos os grupos de mentoria
        let dadosMentorias = await controllerGrupoMentoria.getListarGruposMentoria();
        
        // Validação para verificar se existem dados a serem retornados
        response.status(dadosMentorias.status_code);
        response.json(dadosMentorias);
    } catch (error) {
        console.error('Erro ao listar grupos de mentoria:', error);
        response.status(500).json({ status_code: 500, message: 'Erro interno do servidor' });
    }
});

// Endpoint: Retorna um grupo de mentoria pelo ID
app.get('/v1/studyfy/mentoria/:id', cors(), async function(request, response) {
    try {
        // Recebe o ID da requisição
        let idMentoria = request.params.id;
        
        // Encaminha o ID para a controller buscar o grupo de mentoria
        let dadosMentoria = await controllerGrupoMentoria.getBuscarGrupoMentoriaId(idMentoria);
        
        response.status(dadosMentoria.status_code);
        response.json(dadosMentoria);
    } catch (error) {
        console.error('Erro ao buscar grupo de mentoria:', error);
        response.status(500).json({ status_code: 500, message: 'Erro interno do servidor' });
    }
});

// Endpoint: Insere um novo grupo de mentoria
app.post('/v1/studyfy/mentorias', cors(), bodyParserJSON, async function(request, response) {
    try {
        // Recebe o content-type da requisição
        let contentType = request.headers['content-type'];
        
        // Recebe todos os dados encaminhados na requisição pelo body
        let dadosBody = request.body;
        
        // Encaminha os dados para a controller enviar para o DAO
        let resultDadosNovaMentoria = await controllerGrupoMentoria.setInserirNovoGrupoMentoria(dadosBody, contentType);
        
        response.status(resultDadosNovaMentoria.status_code);
        response.json(resultDadosNovaMentoria);
    } catch (error) {
        console.error('Erro ao inserir grupo de mentoria:', error);
        response.status(500).json({ status_code: 500, message: 'Erro interno do servidor' });
    }
});

// Endpoint: Deleta um grupo de mentoria pelo ID
app.delete('/v1/studyfy/mentorias/:id', cors(), async function(request, response) {
    try {
        let idMentoria = request.params.id;
        
        let dadosMentoria = await controllerGrupoMentoria.setExcluirGrupoMentoria(idMentoria);
        
        response.status(dadosMentoria.status_code);
        response.json(dadosMentoria);
    } catch (error) {
        console.error('Erro ao excluir grupo de mentoria:', error);
        response.status(500).json({ status_code: 500, message: 'Erro interno do servidor' });
    }
});

// Endpoint: Atualiza um grupo de mentoria pelo ID
app.put('/v1/studyfy/mentorias/:id', cors(), bodyParserJSON, async function(request, response) {
    try {
        let contentType = request.headers['content-type'];
        let dadosBody = request.body;
        let idMentoria = request.params.id;
        
        let dadosMentoria = await controllerGrupoMentoria.setAtualizarGrupoMentoria(idMentoria, dadosBody, contentType);
        
        response.status(dadosMentoria.status_code);
        response.json(dadosMentoria);
    } catch (error) {
        console.error('Erro ao atualizar grupo de mentoria:', error);
        response.status(500).json({ status_code: 500, message: 'Erro interno do servidor' });
    }
});

  


// --------------------   CRUD DE MEMBROS  --------------------- 


app.get('/v1/studyfy/membros', cors(), async function(request, response) {
    try {
        // Chama a função da controller para retornar todos os grupos de mentoria
        let dadosMembros = await controllerMembros.getListarMembros();
        
        // Validação para verificar se existem dados a serem retornados
        response.status(dadosMembros.status_code);
        response.json(dadosMembros);
    } catch (error) {
        console.error('Erro ao listar os membros:', error);
        response.status(500).json({ status_code: 500, message: 'Erro interno do servidor' });
    }
});
