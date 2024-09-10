/*******************************************************
 * DATA: 05/09/2024
 * Autor: Ricardo Borges
 * Versão: 2.0
*******************************************************/

// Importa as mensagens e os DAOs
const message = require('./modulo/config.js');
const alunoDAO = require('../model/aluno.js');
const materiaDAO = require('../model/materia.js');

// Função auxiliar para validar a data de nascimento
function isValidDate(dateString) {

    // Verifica se a data está no formato YYYY-MM-DD
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) {
        return false;
    }

     // Verifica se ta em ano,mes e dia
    const [year, month, day] = dateString.split('-').map(Number);

    // Verifica se o ano é válido ou seja antes de 1900 vai dar
    if (year < 1900) {
        return false;
    }

    // Verifica se o mês é válido
    if (month < 1 || month > 12) {
        return false;
    }

    // Verifica se o dia é válido
    const daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) {
        return false;
    }

    return true;
}

// Função para listar alunos
const getListarAluno = async function() {
    try {
        let alunoJSON = {};
        let dadosAlunos = await alunoDAO.selectAllAlunos();

        if (dadosAlunos) {
            for (let i = 0; i < dadosAlunos.length; i++) {
                console.log(dadosAlunos[i]);

                let materiasAluno = await materiaDAO.selectMateriaByIdAluno(dadosAlunos[i].id);
                let listaMateriasAluno = materiasAluno;

                dadosAlunos[i].materias = listaMateriasAluno;
            }

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
};

// Função para buscar aluno por ID
const getBuscarAlunoId = async function(id) {
    try {
        let idAluno = id;
        let alunoJSON = {};

        if (idAluno === '' || idAluno === undefined || isNaN(idAluno)) {
            return message.ERROR_INVALID_ID; // 400
        } else {
            let dadosAlunos = await alunoDAO.selectAlunobyID(idAluno);

            if (dadosAlunos) {
                if (dadosAlunos.length > 0) {
                    for (let i = 0; i < dadosAlunos.length; i++) {
                        console.log(dadosAlunos[i]);

                        let materiasAluno = await materiaDAO.selectMateriaByIdAluno(dadosAlunos[i].id);
                        let listaMateriasAluno = materiasAluno;

                        dadosAlunos[i].materias = listaMateriasAluno;
                    }
                    
                    alunoJSON.aluno = dadosAlunos;
                    alunoJSON.status_code = 200;

                    return alunoJSON;
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
const setInserirNovoAluno = async function(dadosAluno, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            let alunoJSON = {};

            console.log('oi');

            // Validação de campos obrigatórios ou com digitação inválida
            if (dadosAluno.nome === '' || dadosAluno.nome === undefined || dadosAluno.nome === null || dadosAluno.nome.length > 100 ||
                dadosAluno.email === '' || dadosAluno.email === undefined || dadosAluno.email === null || dadosAluno.email.length > 100 ||
                dadosAluno.telefone === '' || dadosAluno.telefone === undefined || dadosAluno.telefone === null || dadosAluno.telefone.length > 12 ||
                dadosAluno.senha === '' || dadosAluno.senha === undefined || dadosAluno.senha === null || dadosAluno.senha.length > 255 ||
                dadosAluno.data_nascimento === '' || dadosAluno.data_nascimento === undefined || dadosAluno.data_nascimento === null || dadosAluno.data_nascimento.length !== 10 ||
                dadosAluno.serie === '' || dadosAluno.serie === undefined || dadosAluno.serie === null || dadosAluno.serie.length > 20 ||
                !isValidDate(dadosAluno.data_nascimento) ||
                dadosAluno.materia_id === '' || dadosAluno.materia_id === undefined || dadosAluno.materia_id === null || dadosAluno.materia_id.length > 5
            ) {
                return message.ERROR_REQUIRED_FIELDS;

            } else {

                console.log(dadosAluno.materia_id);
                

                let novoAluno = await alunoDAO.insertAluno(dadosAluno);
                
                if (novoAluno) {
                    let lastId = await alunoDAO.lastIDAluno();
                    dadosAluno.id = lastId[0].id;

                    alunoJSON.aluno = dadosAluno;
                    alunoJSON.status = message.SUCCESS_CREATED_ITEM.status;
                    alunoJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code;
                    alunoJSON.message = message.SUCCESS_CREATED_ITEM.message;

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

// Função para excluir aluno
const setExcluirAluno = async function(id) {
    try {
        let idAluno = id;

        if (idAluno === '' || idAluno === undefined || isNaN(idAluno)) {
            return message.ERROR_INVALID_ID; // 400
        } else {
            let alunoDeletado = await alunoDAO.deleteAluno(idAluno);

            if (alunoDeletado) {
                return message.SUCCESS_DELETED_ITEM;
            } else {
                return message.ERROR_INTERNAL_SERVER_DB; // 500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER; // 500
    }
};

// Função para atualizar aluno
const setAtualizarAluno = async function(id, dadosAluno, contentType) {
    try {
        let idAluno = id;

        if (idAluno === '' || idAluno === undefined || isNaN(idAluno) || idAluno === null) {
            return message.ERROR_INVALID_ID;
        } else {
            if (String(contentType).toLowerCase() === 'application/json') {
                let updateAlunoJSON = {};
                
                if (dadosAluno.nome === '' || dadosAluno.nome === undefined || dadosAluno.nome === null || dadosAluno.nome.length > 100 ||
                    dadosAluno.email === '' || dadosAluno.email === undefined || dadosAluno.email === null || dadosAluno.email.length > 100 ||
                    dadosAluno.telefone === '' || dadosAluno.telefone === undefined || dadosAluno.telefone === null || dadosAluno.telefone.length > 12 ||
                    dadosAluno.senha === '' || dadosAluno.senha === undefined || dadosAluno.senha === null || dadosAluno.senha.length > 255 ||
                    dadosAluno.serie === '' || dadosAluno.serie === undefined || dadosAluno.serie === null || dadosAluno.serie.length > 20 ||
                    dadosAluno.data_nascimento === '' || dadosAluno.data_nascimento === undefined || dadosAluno.data_nascimento === null || dadosAluno.data_nascimento.length > 10 ||
                    !isValidDate(dadosAluno.data_nascimento)
                ) {
                    return message.ERROR_REQUIRED_FIELDS;
                } else {
                    let alunoById = await alunoDAO.selectAlunobyID(id);

                    if (alunoById.length > 0) {
                        let uptadeAluno = await alunoDAO.updateAluno(id, dadosAluno);
                        
                        if (uptadeAluno) {
                            updateAlunoJSON.aluno = dadosAluno;
                            updateAlunoJSON.status = message.SUCCESS_UPDATED_ITEM.status;
                            updateAlunoJSON.status_code = message.SUCCESS_UPDATED_ITEM.status_code;
                            updateAlunoJSON.message = message.SUCCESS_UPDATED_ITEM.message;
                            
                            return updateAlunoJSON;
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
    getListarAluno,
    getBuscarAlunoId,
    setInserirNovoAluno,
    setAtualizarAluno,
    setExcluirAluno
};
