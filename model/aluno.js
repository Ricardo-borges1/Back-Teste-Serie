/*******************************************************
 * DATA: 05/09/2024
 * Autor: Ricardo Borges
 * Versão: 1.1
*******************************************************/

// Importa de biblioteca do @prisma/client
const { PrismaClient } = require('@prisma/client')

// Instacia da classe PrismaClient
const prisma = new PrismaClient()


const selectAlunobyID = async function(id){
    try {
        // Realiza a busca do genero pelo ID
        let sql = `select * from tbl_alunos where id = ${id}`;

        // Executa no banco de dados o script sql
        let rsAluno= await prisma.$queryRawUnsafe(sql);

            return rsAluno;
    
        } catch (error) {
            console.log(error);
            return false;
            
        }
        
}

const selectAllAlunos = async function(){
    try {
        // Realiza a busca do genero pelo ID
        let sql = `select * from tbl_alunos where id > 0`;

        // Executa no banco de dados o script sql
        let rsAluno= await prisma.$queryRawUnsafe(sql);

            return rsAluno;
    
        } catch (error) {
            console.log(error);
            return false;
            
        }
        
}

const insertAluno = async function(dadosAluno) {
    try {
        let sql

         sql = ` INSERT INTO tbl_alunos (
                            nome,
                            email,
                            senha,
                            telefone,
                            data_nascimento,
                            serie
                        ) 
         VALUES 
           ('${dadosAluno.nome}',
           '${dadosAluno.email}',
           '${dadosAluno.senha}',
           '${dadosAluno.telefone}',
           '${dadosAluno.data_nascimento}',
           '${dadosAluno.serie}'
           )`; 

           console.log(sql);

        let result = await prisma.$executeRawUnsafe(sql);
        
        if (result){

            let lastID=await lastIDAluno()
            for (let aluno of dadosAluno.materia_id) {

                // Verificar se a combinação já existe
                let checkSql = `SELECT * FROM tbl_alunos_materias 
                                WHERE aluno_id = ${lastID[0].id} AND materia_id = ${aluno};`;

                let insert = await prisma.$queryRawUnsafe(checkSql);

                if (insert.length === 0) {
                    // Se não existe, insere
                    sql = `INSERT INTO tbl_alunos_materias (
                        aluno_id, 
                        materia_id
                    ) VALUES (
                        ${lastID[0].id},
                        ${aluno}
                    );`;

                    let insertResult = await prisma.$executeRawUnsafe(sql);

                    if (!insertResult) {
                        return false;
                    }
                }
            }

            return result;
        } else {
            return false;
        }

    } catch (error) {
        console.log(error);
        return false;
    }
}



const updateAluno = async function(id, dadosAluno) {
    try {
        // Atualiza os dados do aluno na tabela tbl_alunos
        let sql = `
            UPDATE tbl_alunos
            SET 
                nome = '${dadosAluno.nome}',
                email = '${dadosAluno.email}',
                senha = '${dadosAluno.senha}',
                telefone = '${dadosAluno.telefone}',
                data_nascimento = '${dadosAluno.data_nascimento}',
                serie = '${dadosAluno.serie}'
            WHERE id = ${id};
        `;
        
        console.log(sql);

        let result = await prisma.$executeRawUnsafe(sql);

        if (result) {
            // Verifica se todas as matérias existem
            for (let materia of dadosAluno.materia_id) {
                let checkMateriaSql = `SELECT COUNT(*) AS count FROM tbl_materias WHERE id = ${materia};`;
                let countResult = await prisma.$queryRawUnsafe(checkMateriaSql);
                if (countResult[0].count === 0) {
                    console.log(`Erro: Matéria com ID ${materia} não encontrada.`);
                    return false;
                }
            }

            // Remove todas as associações antigas de matérias para o aluno
            sql = `DELETE FROM tbl_alunos_materias WHERE aluno_id = ${id};`;
            result = await prisma.$executeRawUnsafe(sql);

            if (!result) {
                return false;
            }

            // Adiciona as novas associações de matérias
            for (let materia of dadosAluno.materia_id) {
                sql = `
                    INSERT INTO tbl_alunos_materias (aluno_id, materia_id)
                    VALUES (${id}, ${materia});
                `;
                
                let insertResult = await prisma.$executeRawUnsafe(sql);

                if (!insertResult) {
                    return false;
                }
            }

            return result;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};


const lastIDAluno = async function(){
    try {
        let sql = `SELECT id FROM tbl_alunos ORDER BY id DESC LIMIT 1;`

        let sqlID = await prisma.$queryRawUnsafe(sql)

        return sqlID
    } catch (error) {
        return false
    }
    
}

const deleteAluno = async(id) =>{
    try{

        let sql = `delete from tbl_alunos where id = ${id}`
       
    
        //Executa o sql no banco de dados
        let rsdeleteUsuario = await prisma.$executeRawUnsafe(sql)

    
       return rsdeleteUsuario
    
        } catch(error){
            return false
        }
}


module.exports ={
    selectAllAlunos,
    selectAlunobyID,
    lastIDAluno,
    deleteAluno,
    insertAluno,
    updateAluno

}

