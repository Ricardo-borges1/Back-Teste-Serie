/*******************************************************
 * DATA: 19/09/2024
 * Autor: Ricardo Borges
 * Versão: 1.0
*******************************************************/

// Importa de biblioteca do @prisma/client
const { PrismaClient } = require('@prisma/client')

// Instância da classe PrismaClient
const prisma = new PrismaClient()

// Função para selecionar uma série pelo ID
const selectSerieByID = async function(id) {
    try {
        let sql = `SELECT * FROM tbl_series WHERE id = ${id}`;
        let rsSerie = await prisma.$queryRawUnsafe(sql);
        return rsSerie;
    } catch (error) {
        console.log(error);
        return false;
    }
}

// Função para selecionar todas as séries
const selectAllSeries = async function() {
    try {
        let sql = `SELECT * FROM tbl_series`;
        let rsSeries = await prisma.$queryRawUnsafe(sql);
        return rsSeries;
    } catch (error) {
        console.log(error);
        return false;
    }
}



const insertSerie = async function(dadosSerie){
    
    try {
    
        let sql = `INSERT INTO tbl_series (nome) VALUES ('${dadosSerie.nome}')`;
        console.log(sql);
        
        let result = await prisma.$executeRawUnsafe(sql);
        console.log(result);

        if (result)
            return true
        else
            return false;

        } catch (error) {
            return false 
        }

}


const lastIDSerie = async function(){
    try {
        let sql = `SELECT id FROM tbl_series ORDER BY id DESC LIMIT 1;`

        let sqlID = await prisma.$queryRawUnsafe(sql)

        return sqlID
    } catch (error) {
        return false
    }
    
}



const InsertByIdSerie = async function (){
    try {
        
        let sql = `select cast(last_insert_id() AS DECIMAL) as id from tbl_series limit 1`;
        let rsSerie = await prisma.$queryRawUnsafe(sql);

        return rsSerie;

    } catch (error) {
        return false        
    }
}



// Função para atualizar uma série existente
const updateSerie = async function(id, dadosSerie) {
    try {
        let sql = `UPDATE tbl_series SET nome = '${dadosSerie.nome}' WHERE id = ${id}`;
        let result = await prisma.$executeRawUnsafe(sql);
        return result;
    } catch (error) {
        console.log(error);
        return false;
    }
}

// Função para deletar uma série pelo ID
const deleteSerie = async function(id) {
    try {
        let sql = `DELETE FROM tbl_series WHERE id = ${id}`;
        let result = await prisma.$executeRawUnsafe(sql);
        return result;
    } catch (error) {
        console.log(error);
        return false;
    }
}

// Exporta as funções
module.exports = {
    selectSerieByID,
    selectAllSeries,
    insertSerie,
    updateSerie,
    deleteSerie,
    InsertByIdSerie,
    lastIDSerie
}
