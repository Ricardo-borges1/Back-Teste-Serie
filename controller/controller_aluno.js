/*******************************************************
 * DATA: 05/09/2024
 * Autor: Ricardo Borges
 * Versão: 1.1
*******************************************************/


const message = require('./modulo/config.js');
const alunoDAO = require('../model/aluno.js');
const materiaDAO = require('../model/materia.js');

const getListarAluno = async function() {
    try {
        // Criar o objeto JSON
        let alunoJSON = {};
        
        // Chamar a função do DAO para retornar os dados da tabela de produtos
        
        let dadosAlunos = await alunoDAO.selectAllAlunos();

        // Validação para verificar se existem dados 
        if (dadosAlunos) {
            for (let i= 0; i< dadosAlunos.length; i++) {
                console.log(dadosAlunos[i]);

                let materiasAluno = await materiaDAO.selectMateriaByIdAluno(dadosAlunos[i].id)
                let listaMateriasAluno = materiasAluno

                dadosAlunos[i].materias = listaMateriasAluno
            }

            // Criar o JSON para devolver para o APP
            console.log(dadosAlunos);
            
            alunoJSON.aluno = dadosAlunos;
            alunoJSON.quantidade = dadosAlunos.length;
            alunoJSON.status_code = 200;
            return alunoJSON;
        } else {
            return message.ERROR_NOT_FOUND;
        } 
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER;
    }
}


const getBuscarAlunoId = async function (id){

    try{
    
    // Recebe o id do filme
    let idAluno = id;
    //Cria o objeto JSON
    let alunoJSON = {};

    //tratamento do ID para verificar se o ID é válido(vazio, indefinido ou não numerico)
    if(idAluno == '' || idAluno == undefined || isNaN(idAluno)){
        return message.ERROR_INVALID_ID //400
    } else {

        // encaminha o id para o DAO buscar no banco de dados 
        let dadosAlunos = await alunoDAO.selectAlunobyID(idAluno)

        // verifca se o DAO retornou dados 
        if(dadosAlunos){

            // Validação para verificar a quantidade de itens retornados
            if(dadosAlunos.length > 0){

                for (let i= 0; i< dadosAlunos.length; i++) {
                    console.log(dadosAlunos[i]);
    
                    let materiasAluno = await materiaDAO.selectMateriaByIdAluno(dadosAlunos[i].id)
                    let listaMateriasAluno = materiasAluno
    
                    dadosAlunos[i].materias = listaMateriasAluno
                }
                 // Cria o JSON para retorno 
            alunoJSON.aluno = dadosAlunos;
            alunoJSON.status_code = 200;

            return alunoJSON;
            } else{
                return message.ERROR_NOT_FOUND
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }
} catch (error) {
    return message.ERROR_INTERNAL_SERVER
}
}






const setInserirNovoAluno = async function (dadosAluno, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            let alunoJSON = {};
            let ultimoID

            console.log('oi');

            // Validação de campos obrigatórios ou com digitação inválida
            if (dadosAluno.nome == '' || dadosAluno.nome == undefined || dadosAluno.nome == null || dadosAluno.nome.length > 100 ||
                dadosAluno.email == '' || dadosAluno.email == undefined || dadosAluno.email == null || dadosAluno.email.length > 100 ||
                dadosAluno.telefone == '' || dadosAluno.telefone == undefined || dadosAluno.telefone == null || dadosAluno.telefone.length > 12 ||
                dadosAluno.senha == '' || dadosAluno.senha == undefined || dadosAluno.senha == null || dadosAluno.senha.length > 255 ||
                dadosAluno.data_nascimento == '' || dadosAluno.data_nascimento == undefined || dadosAluno.data_nascimento == null || dadosAluno.data_nascimento.length!=10 ||
                dadosAluno.materia_id == '' || dadosAluno.materia_id == undefined || dadosAluno.materia_id == null || dadosAluno.materia_id.length > 2
             ){
                return message.ERROR_REQUIRED_FIELDS;
            } else {

                

                // Encaminha os dados do aluno para o DAO inserir dados
                let novoAluno = await alunoDAO.insertAluno(dadosAluno);
                // Verifica se o DAO inseriu os dados no BD
                if (novoAluno) {
                    let lastId = await alunoDAO.lastIDAluno();
                    dadosAluno.id = lastId[0].id;

                    alunoJSON.aluno = dadosAluno;
                    alunoJSON.status = message.SUCCESS_CREATED_ITEM.status;
                    alunoJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code;
                    alunoJSON.message = message.SUCCESS_CREATED_ITEM.message;

                    ultimoID = await alunoDAO.lastIDAluno()
                    dadosAluno.id=ultimoID[0].id

                    return alunoJSON; // 201
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB; // 500
                }
                
            }
        } else {
            return message.ERROR_CONTENT_TYPE; // 415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER; // 500
    }
};


const setExcluirAluno = async(id) => {
    try {
      //Recebe o id do filme em uma variável local
      let idAluno = id
 
      //Validação para verificar se o ID é válido (vazio, indefinido ou não numérico)
      if(idAluno == '' || idAluno == undefined || isNaN(idAluno)){
          return message.ERROR_INVALID_ID //400
      }else{
             let alunoDeletado = await alunoDAO.deleteAluno(idAluno)
  
             if(alunoDeletado){
                 return message.SUCCESS_DELETED_ITEM
             }else{
                 return message.ERROR_INTERNAL_SERVER_DB //500
             }
     }
    } catch (error) {
     return message.ERROR_INTERNAL_SERVER //500
    }
 }

 const setAtualizarAluno = async function(id, dadosAluno, contentType){
    
    try{
        let idAluno = id;

        if(idAluno == '' || idAluno == undefined || isNaN (idAluno)|| idAluno == null){

            return message.ERROR_INVALID_ID
            
        }else{

        if(String(contentType).toLowerCase() == 'application/json'){

            let updateAlunoJSON = {};
            
            if(dadosAluno.nome == ''    || dadosAluno.nome == undefined                  ||  dadosAluno.nome == null                        || dadosAluno.nome.length > 100 ||
            dadosAluno.email == '' || dadosAluno.email == undefined  || dadosAluno.email == null || dadosAluno.email.length > 100 ||
            dadosAluno.telefone == '' || dadosAluno.telefone == undefined || dadosAluno.telefone == null || dadosAluno.length  > 12 ||
            dadosAluno.senha == ''  ||  dadosAluno.senha == undefined ||  dadosAluno.senha == null  ||  dadosAluno.length > 255 ||
            dadosAluno.data_nascimento == ''  || dadosAluno.data_nascimento == undefined ||dadosAluno.data_nascimento == null || dadosAluno.length > 10
            ){
            return message.ERROR_REQUIRED_FIELDS
        } else {

            let alunoById = await alunoDAO.selectAlunobyID(id)


            if(alunoById.length > 0){
                
                    let uptadeAluno = await alunoDAO.updateAluno(id,dadosAluno);
                    
                   
                    if(uptadeAluno){
                      
                        updateAlunoJSON.aluno = dadosAluno
                        updateAlunoJSON.status = message.SUCCESS_UPDATED_ITEM.status
                        updateAlunoJSON.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                        updateAlunoJSON.message = message.SUCCESS_UPDATED_ITEM.message
                        
                        return updateAlunoJSON;
                    } else {
                         return message.ERROR_INTERNAL_SERVER_DB
                    }
                
            }else{
                return message.ERROR_NOT_FOUND
            }
        }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}


module.exports = {
    getListarAluno,
    getBuscarAlunoId,
    setInserirNovoAluno,
    setAtualizarAluno,
    setExcluirAluno
};