/*******************************************************
 * DATA: 05/09/2024
 * Autor: Ricardo Borges
 * Versão: 2.0
*******************************************************/

// Importa as mensagens e os DAOs
const mentorDAO = require ('../model/mentor.js')

const getListarMentores = async function() {
    try {
        // Criar o objeto JSON
        let mentoresJSON = {};
        
        // Chamar a função do DAO para retornar os dados da tabela de produtos
        
        let dadosMentor = await mentorDAO.selectAllMentores();

        // Validação para verificar se existem dados 
        if (dadosMentor) {
            // Criar o JSON para devolver para o APP
            mentoresJSON.mentores = dadosMentor;
            mentoresJSON.quantidade = dadosMentor.length;
            mentoresJSON.status_code = 200;
            return mentoresJSON;
        } else {
            return message.ERROR_NOT_FOUND;
        } 
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER;
    }
}


module.exports = {
    getListarMentores
};