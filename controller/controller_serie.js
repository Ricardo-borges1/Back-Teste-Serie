/*******************************************************
 * DATA: 19/09/2024
 * Autor: Ricardo Borges
 * Versão: 1.0
*******************************************************/

// Importa as mensagens e os DAOs
const message = require('./modulo/config.js');
const serieDAO = require('../model/serie.js');

// Função para listar todas as séries
const getListarSeries = async function() {
    try {
        let serieJSON = {};
        let dadosSeries = await serieDAO.selectAllSeries();

        if (dadosSeries) {
            serieJSON.series = dadosSeries;
            serieJSON.quantidade = dadosSeries.length;
            serieJSON.status_code = 200;
            return serieJSON;
        } else {
            return message.ERROR_NOT_FOUND;
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};

// Função para buscar uma série por ID
const getBuscarSerieId = async function(id) {
    try {
        if (id === '' || id === undefined || isNaN(id)) {
            return message.ERROR_INVALID_ID; // 400
        } else {
            let dadosSerie = await serieDAO.selectSerieByID(id);

            if (dadosSerie) {
                if (dadosSerie.length > 0) {
                    return { serie: dadosSerie, status_code: 200 };
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

// Função para inserir novo aluno
const setInserirNovaSerie = async function(dadosSerie, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            let serieJSON = {};

            // Validação de campos obrigatórios ou com digitação inválida
            console.log('ooioioioioioio: ' + dadosSerie);
            
            if (
                !dadosSerie.nome || dadosSerie.nome.length > 100 
            ) {
                return message.ERROR_REQUIRED_FIELDS;
            } else {
                let novaSerie = await serieDAO.insertSerie(dadosSerie);
                
                if (novaSerie) {
                    let lastId = await serieDAO.lastIDSerie();
                    dadosSerie.id = lastId[0].id;

                    serieJSON.serie = dadosSerie;
                    serieJSON.status = message.SUCCESS_CREATED_ITEM.status;
                    serieJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code;
                    serieJSON.message = message.SUCCESS_CREATED_ITEM.message;

                    return serieJSON; // 201
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB; // 500
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE; // 415
        }
    } catch (error) {
        console.error(error);
        return message.ERROR_INTERNAL_SERVER; // 500
    }
};


// Função para excluir uma série
const setExcluirSerie = async function(id) {
    try {
        if (id === '' || id === undefined || isNaN(id)) {
            return message.ERROR_INVALID_ID; // 400
        } else {
            let serieDeletada = await serieDAO.deleteSerie(id);
            if (serieDeletada) {
                return message.SUCCESS_DELETED_ITEM;
            } else {
                return message.ERROR_INTERNAL_SERVER_DB; // 500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER; // 500
    }
};

// Função para atualizar uma série
const setAtualizarSerie = async function(id, dadosSerie, contentType) {
    try {
        if (id === '' || id === undefined || isNaN(id)) {
            return message.ERROR_INVALID_ID; // 400
        } else {
            if (String(contentType).toLowerCase() === 'application/json') {
                if (!dadosSerie.nome || dadosSerie.nome.length > 50) {
                    return message.ERROR_REQUIRED_FIELDS;
                } else {
                    let serieById = await serieDAO.selectSerieByID(id);
                    if (serieById.length > 0) {
                        let updateSerie = await serieDAO.updateSerie(id, dadosSerie);
                        if (updateSerie) {
                            return { status: message.SUCCESS_UPDATED_ITEM.status, status_code: message.SUCCESS_UPDATED_ITEM.status_code, message: message.SUCCESS_UPDATED_ITEM.message };
                        } else {
                            return message.ERROR_INTERNAL_SERVER_DB;
                        }
                    } else {
                        return message.ERROR_NOT_FOUND;
                    }
                }
            } else {
                return message.ERROR_CONTENT_TYPE;
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER;
    }
};

// Exporta as funções
module.exports = {
    getListarSeries,
    getBuscarSerieId,
    setInserirNovaSerie,
    setAtualizarSerie,
    setExcluirSerie
};
