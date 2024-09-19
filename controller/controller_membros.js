/*******************************************************
 * DATA: 05/09/2024
 * Autor: Ricardo Borges
 * Versão: 2.0
*******************************************************/

// Importa as mensagens e os DAOs
const membrosDAO = require ('../model/membros.js')


const getListarMembros = async function() {
    try {
        // Criar o objeto JSON
        let membrosJSON = {};
        
        // Chamar a função do DAO para retornar os dados da tabela de produtos
        
        let dadosMembros = await membrosDAO.selectAllMembros();

        // Validação para verificar se existem dados 
        if (dadosMembros) {
            // Criar o JSON para devolver para o APP
            membrosJSON.membros = dadosMembros;
            membrosJSON.quantidade = dadosMembros.length;
            membrosJSON.status_code = 200;
            return membrosJSON;
        } else {
            return message.ERROR_NOT_FOUND;
        } 
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER;
    }
}


const getBuscarGrupoMentoriaId = async function(id) {
    try {
        let idMembros = id;
        let grupoMembrosJSON = {};

        if (idMembros === '' || idMembros === undefined || isNaN(idMembros)) {
            return message.ERROR_INVALID_ID; // 400
        } else {
            let dadosMembros = await membrosDAO.selectByIdMembro(idMembros);

            if (dadosMembros) {
                if (dadosMembros.length > 0) {
                    grupoMembrosJSON.grupo = dadosMembros;
                    grupoMembrosJSON.status_code = 200;
                    return grupoMembrosJSON;
                } else {
                    return message.ERROR_NOT_FOUND;
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_DB;
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER;
    }
};

module.exports = {
    getListarMembros,
    getBuscarGrupoMentoriaId
};

