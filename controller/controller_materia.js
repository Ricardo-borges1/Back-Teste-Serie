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



module.exports = {
    getListarMaterias,
    getListarMateriasByIdAluno
};