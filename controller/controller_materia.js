/*******************************************************
 * DATA: 05/09/2024
 * Autor: Ricardo Borges
 * Versão: 1.0
*******************************************************/


const message = require('./modulo/config.js');
const materiaDAO = require('../model/materia.js');

const getListarMaterias = async function() {
    try {
        // Criar o objeto JSON
        let materiasJSON = {};
        
        // Chamar a função do DAO para retornar os dados da tabela de produtos
        
        let dadosMaterias = await materiaDAO.selectAllMaterias();

        // Validação para verificar se existem dados 
        if (dadosMaterias) {
            // Criar o JSON para devolver para o APP
            materiasJSON.materias = dadosMaterias;
            materiasJSON.quantidade = dadosMaterias.length;
            materiasJSON.status_code = 200;
            return materiasJSON;
        } else {
            return message.ERROR_NOT_FOUND;
        } 
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER;
    }
}

const getListarMateriasByIdAluno = async function(id) {
    try {
        // Criar o objeto JSON
        let materiasJSON = {};
        
        // Chamar a função do DAO para retornar os dados da tabela de produtos
        
        let dadosMaterias = await materiaDAO.selectMateriaByIdAluno(id);

        // Validação para verificar se existem dados 
        if (dadosMaterias) {
            // Criar o JSON para devolver para o APP
            materiasJSON.materias = dadosMaterias;
            materiasJSON.quantidade = dadosMaterias.length;
            materiasJSON.status_code = 200;
            return materiasJSON;
        } else {
            return message.ERROR_NOT_FOUND;
        } 
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER;
    }
}

const setInserirNovaMateria = async function (dadosMaterias, contentType ){

    try{

console.log(contentType);
    // validação para aplicação do contentType
    if(String(contentType).toLowerCase() == 'application/json'){

    // cria o objeto JSON para devolver os dados criados na requisição
    let novaMateriaJSON = {};
    

    
    // validação de campos obrigatorios ou com digitação inválida
    if(dadosMaterias.nome_materia == ''    || dadosMaterias.nome_materia == undefined       ||  dadosMaterias.nome_materia == null               || dadosMaterias.nome_materia.length > 255         
    ){
        
        // return do status code 400
        return message.ERROR_REQUIRED_FIELDS
    
    } else {

        let validateStatus = true;

     // validação para verificar se podemos encaminhar os dados para o DA0
     if(validateStatus){

        // Encaminha os dados do filme para o DAO inserir dados
        let novaMateria = await materiaDAO.insertMateria(dadosMaterias);

        console.log(novaMateria);

        // validação para verificar se o DAO inseriu os dados do BD
        if (novaMateria)
        {

            let ultimoId = await materiaDAO.InsertByIdMateria ()
            dadosMaterias.id = ultimoId[0].id
        
            // se inseriu cria o JSON dos dados (201)
            novaMateriaJSON.materias  = dadosMaterias
            novaMateriaJSON.status = message.SUCESS_CREATED_ITEM.status
            novaMateriaJSON.status_code = message.SUCESS_CREATED_ITEM.status_code
            novaMateriaJSON.message = message.SUCESS_CREATED_ITEM.message 

            return  novaMateriaJSON; // 201
        }else{
         
            return message.ERROR_INTERNAL_SERVER_DB // 500
            }
        }   
      }
    } else {
        return message.ERROR_CONTENT_TYPE // 415
    }
} catch(error){
    return message.ERROR_INTERNAL_SERVER // 500
}

}




module.exports = {
    getListarMaterias,
    getListarMateriasByIdAluno,
    setInserirNovaMateria
};