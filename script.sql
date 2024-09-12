-- Criação do banco de dados
CREATE DATABASE StudyFy;

USE StudyFy;

-- Tabela tbl_mentor
CREATE TABLE tbl_mentor (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    data_ingresso TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Tabela tbl_grupo_mentoria
CREATE TABLE tbl_grupo_mentoria (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nome VARCHAR(100) NOT NULL,
    capacidade INT NOT NULL,
    descricao TINYTEXT,
    foto_perfil VARCHAR(300),
    serie_min INT,
    serie_max INT,
    chat_aberto TINYINT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    mentor_id INT NOT NULL,
    FOREIGN KEY (mentor_id) REFERENCES tbl_mentor(id)
);

-- Tabela tbl_atividade_grupo_mentoria
CREATE TABLE tbl_atividade_grupo_mentoria (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nome VARCHAR(100) NOT NULL,
    descricao TINYTEXT NOT NULL,
    grupo_mentoria_id INT NOT NULL,
    FOREIGN KEY (grupo_mentoria_id) REFERENCES tbl_grupo_mentoria(id)
);

-- Tabela tbl_tipo_questao
CREATE TABLE tbl_tipo_questao (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    tipo_questao VARCHAR(45) NOT NULL
);

-- Tabela tbl_questao
CREATE TABLE tbl_questao (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    enunciado VARCHAR(45) NOT NULL,
    tipo_questao_id INT NOT NULL,
    imagem VARCHAR(300),
    atividade_grupo_mentoria_id INT NOT NULL,
    FOREIGN KEY (atividade_grupo_mentoria_id) REFERENCES tbl_atividade_grupo_mentoria(id),
    FOREIGN KEY (tipo_questao_id) REFERENCES tbl_tipo_questao(id)
);

-- Tabela tbl_resposta_lacunas
CREATE TABLE tbl_resposta_lacunas (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    posicao_inicial INT NOT NULL,
    posicao_fim INT NOT NULL,
    questao_id INT NOT NULL,
    palavra VARCHAR(45),
    FOREIGN KEY (questao_id) REFERENCES tbl_questao(id)
);

-- Tabela tbl_resposta_verdadeiro_falso
CREATE TABLE tbl_resposta_verdadeiro_falso (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    autenticacao TINYINT NOT NULL,
    questao_id INT NOT NULL,
    conteudo VARCHAR(45),
    FOREIGN KEY (questao_id) REFERENCES tbl_questao(id)
);

-- Tabela tbl_resposta_correspondencia
CREATE TABLE tbl_resposta_correspondencia (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    palavra_correspondente VARCHAR(45) NOT NULL,
    resposta_correspondente VARCHAR(45) NOT NULL,
    questao_id INT NOT NULL,
    FOREIGN KEY (questao_id) REFERENCES tbl_questao(id)
);

-- Tabela tbl_resposta_multipla_escolha
CREATE TABLE tbl_resposta_multipla_escolha (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    conteudo TINYTEXT NOT NULL,
    autenticacao TINYINT NOT NULL,
    questao_id INT NOT NULL,
    FOREIGN KEY (questao_id) REFERENCES tbl_questao(id)
);

-- Tabela tbl_ordem_palavra
CREATE TABLE tbl_ordem_palavra (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    posicao INT NOT NULL,
    questao_id INT NOT NULL,
    conteudo VARCHAR(45) NOT NULL,
    FOREIGN KEY (questao_id) REFERENCES tbl_questao(id)
);

-- Tabela tbl_materias
CREATE TABLE tbl_materias (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nome_materia VARCHAR(90) NOT NULL
);

-- Tabela tbl_alunos
CREATE TABLE tbl_alunos (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nome VARCHAR(90),
    email VARCHAR(256),
    senha VARCHAR(25) NOT NULL,
    data_nascimento DATE NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    serie VARCHAR(20) NOT NULL
);

-- Tabela tbl_alunos_materiais
CREATE TABLE tbl_alunos_materias (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    aluno_id INT NOT NULL,
    materia_id INT NOT NULL,
    FOREIGN KEY (aluno_id) REFERENCES tbl_alunos(id),
    FOREIGN KEY (materia_id) REFERENCES tbl_materias(id)
);

-- Tabela tbl_professor
CREATE TABLE tbl_professor (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nome VARCHAR(90),
    email VARCHAR(256),
    senha VARCHAR(25) NOT NULL,
    data_nascimento DATE NOT NULL,
    telefone VARCHAR(20) NOT NULL
);

-- Tabela tbl_professor_materias
CREATE TABLE tbl_professor_materias (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    professor_id INT NOT NULL,
    materia_id INT NOT NULL,
    FOREIGN KEY (professor_id) REFERENCES tbl_professor(id),
    FOREIGN KEY (materia_id) REFERENCES tbl_materias(id)
);

-- Tabela tbl_membros
CREATE TABLE tbl_membros (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    aluno_id INT NOT NULL,
    grupo_mentoria_id INT NOT NULL,
    FOREIGN KEY (aluno_id) REFERENCES tbl_alunos(id),
    FOREIGN KEY (grupo_mentoria_id) REFERENCES tbl_grupo_mentoria(id)
);

-- Tabela tbl_duvida_compartilhada
CREATE TABLE tbl_duvida_compartilhada (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    conteudo TEXT,
    data_envio VARCHAR(45),
    membro_id INT NOT NULL,
    respondida VARCHAR(45),
    FOREIGN KEY (membro_id) REFERENCES tbl_membros(id)
);

-- Tabela tbl_resposta_duvida
CREATE TABLE tbl_resposta_duvida (
    id_resposta_duvida INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    conteudo VARCHAR(45) NOT NULL,
    data_resposta VARCHAR(45),
    duvida_compartilhada_id INT NOT NULL,
    mentor_id INT NOT NULL,
    FOREIGN KEY (duvida_compartilhada_id) REFERENCES tbl_duvida_compartilhada(id),
    FOREIGN KEY (mentor_id) REFERENCES tbl_mentor(id)
);

-- Tabela tbl_professor_mentor
CREATE TABLE tbl_professor_mentor (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    professor_id INT NOT NULL,
    mentor_id INT NOT NULL,
    FOREIGN KEY (professor_id) REFERENCES tbl_professor(id),
    FOREIGN KEY (mentor_id) REFERENCES tbl_mentor(id)
);

-- Tabela tbl_aluno_mentor
CREATE TABLE tbl_aluno_mentor (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    aluno_id INT NOT NULL,
    mentor_id INT NOT NULL,
    FOREIGN KEY (aluno_id) REFERENCES tbl_alunos(id),
    FOREIGN KEY (mentor_id) REFERENCES tbl_mentor(id)
);

---------------------------------------------------------------------------------------

-- Inserir dados na tabela tbl_mentor

select * from tbl_mentor;
INSERT INTO tbl_mentor (id) VALUES (1);
INSERT INTO tbl_mentor (id) VALUES (2);
INSERT INTO tbl_mentor (id) VALUES (3);
INSERT INTO tbl_mentor (id) VALUES (4);
INSERT INTO tbl_mentor (id) VALUES (5);



-- Inserir dados na tabela tbl_grupo_mentoria
INSERT INTO tbl_grupo_mentoria (nome, capacidade, descricao, foto_perfil, serie_min, serie_max, chat_aberto, data_criacao, mentor_id) 
VALUES 
('Grupo A', 10, 'Descrição do Grupo A', 'foto_a.jpg', 1, 3, 1, NOW(), 1),
('Grupo B', 8, 'Descrição do Grupo B', 'foto_b.jpg', 2, 4, 0, NOW(), 2);

-- Inserir dados na tabela tbl_atividade_grupo_mentoria
INSERT INTO tbl_atividade_grupo_mentoria (nome, descricao, grupo_mentoria_id) 
VALUES 
('Atividade 1', 'Descrição da Atividade 1', 1),
('Atividade 2', 'Descrição da Atividade 2', 2);

-- Inserir dados na tabela tbl_tipo_questao
INSERT INTO tbl_tipo_questao (tipo_questao) VALUES ('Múltipla Escolha');
INSERT INTO tbl_tipo_questao (tipo_questao) VALUES ('Verdadeiro ou Falso');
INSERT INTO tbl_tipo_questao (tipo_questao) VALUES ('Correspondência');
INSERT INTO tbl_tipo_questao (tipo_questao) VALUES ('Lacunas');

-- Inserir dados na tabela tbl_questao
INSERT INTO tbl_questao (enunciado, tipo_questao_id, imagem, atividade_grupo_mentoria_id) 
VALUES 
('Questão 1', 1, 'imagem1.jpg', 1),
('Questão 2', 2, 'imagem2.jpg', 2);

-- Inserir dados na tabela tbl_resposta_lacunas
INSERT INTO tbl_resposta_lacunas (id, posicao_inicial, posicao_fim, questao_id, palavra) 
VALUES 
(1, 10, 20, 1, 'resposta1');

-- Inserir dados na tabela tbl_resposta_verdadeiro_falso
INSERT INTO tbl_resposta_verdadeiro_falso (autenticacao, questao_id, conteudo) 
VALUES 
(1, 2, 'Verdadeiro');

-- Inserir dados na tabela tbl_resposta_correspondencia
INSERT INTO tbl_resposta_correspondencia (id, palavra_correspondente, resposta_correspondente, questao_id) 
VALUES 
(1, 'Termo A', 'Definição A', 1);

-- Inserir dados na tabela tbl_resposta_multipla_escolha
INSERT INTO tbl_resposta_multipla_escolha (conteudo, autenticacao, questao_id) 
VALUES 
('Opção 1', 1, 1),
('Opção 2', 0, 1);

-- Inserir dados na tabela tbl_ordem_palavra
INSERT INTO tbl_ordem_palavra (posicao, questao_id, conteudo) 
VALUES 
(1, 1, 'Palavra1'),
(2, 1, 'Palavra2');

-- Inserir dados na tabela tbl_alunos
INSERT INTO tbl_alunos (nome, email, senha, data_nascimento, telefone, serie) 
VALUES 
('Aluno 1', 'aluno1@example.com', 'senha1', '2005-05-15', '11987654321', 1 ),
('Aluno 2', 'aluno2@example.com', 'senha2', '2006-06-20', '11987654322', 2 );

-- Inserir dados na tabela tbl_membros
INSERT INTO tbl_membros (aluno_id, grupo_mentoria_id) 
VALUES 
(1, 1),
(2, 2);

-- Inserir dados na tabela tbl_duvida_compartilhada
INSERT INTO tbl_duvida_compartilhada (conteudo, data_envio, membro_id, respondida) 
VALUES 
('Dúvida sobre a atividade', '2024-09-10', 1, 'Não');

-- Inserir dados na tabela tbl_materias
INSERT INTO tbl_materias (nome_materia) 
VALUES 
('Matemática'),
('Português');

-- Inserir dados na tabela tbl_alunos_materiais
INSERT INTO tbl_alunos_materias (materia_id, aluno_id) 
VALUES 
(1, 1),
(2, 2);

-- Inserir dados na tabela tbl_professor
INSERT INTO tbl_professor (nome, email, senha, data_nascimento, telefone) 
VALUES 
('Professor A', 'professor_a@example.com', 'senha_prof', '1980-10-10', '11987654323'),
('Professor B', 'professor_b@example.com', 'senha_prof', '1985-12-12', '11987654324');

-- Inserir dados na tabela tbl_professor_materias
INSERT INTO tbl_professor_materias (professor_id, materia_id) 
VALUES 
(1, 1),
(2, 2);

-- Inserir dados na tabela tbl_resposta_duvida
INSERT INTO tbl_resposta_duvida (conteudo, data_resposta, duvida_compartilhada_id, mentor_id) 
VALUES 
('Resposta para a dúvida', '2024-09-11', 1, 1);



-- Inserir dados na tabela tbl_professor_mentor
INSERT INTO tbl_professor_mentor (professor_id, mentor_id) 
VALUES 
(3, 3);

-- Inserir dados na tabela tbl_aluno_mentor
INSERT INTO tbl_aluno_mentor (aluno_id, mentor_id) 
VALUES 
(1, 1);




DELETE FROM tbl_aluno_mentor
WHERE aluno_id =1;


select * from tbl_aluno_mentor where mentor_id = 3;

select * from tbl_mentor;

SELECT 
    alunos.id AS aluno_id,
    alunos.nome AS aluno_nome,
    mentores.id AS mentor_id,
    mentores.data_ingresso AS mentor_data_ingresso
FROM 
    tbl_aluno_mentor AS aluno_mentor
JOIN 
    tbl_alunos AS alunos ON aluno_mentor.aluno_id = alunos.id
JOIN 
    tbl_mentor AS mentores ON aluno_mentor.mentor_id = 1;


-- Verifique se há registros duplicados na tabela tbl_alunos
SELECT id, COUNT(*) FROM tbl_alunos GROUP BY id HAVING COUNT(*) > 1;

-- Verifique se há registros duplicados na tabela tbl_mentor
SELECT id, COUNT(*) FROM tbl_mentor GROUP BY id HAVING COUNT(*) > 1;

SELECT aluno_id, COUNT(*) FROM tbl_aluno_mentor WHERE mentor_id = 3 GROUP BY aluno_id;


SELECT aluno_id, COUNT(*) AS num_associacoes
FROM tbl_aluno_mentor
WHERE mentor_id = 2
GROUP BY aluno_id;

---------------------------------------------------------------------------------------

ALTER TABLE `studyFy`.`tbl_alunos_materiais` 
RENAME TO `studyFy`.`tbl_alunos_materias`;

UPDATE tbl_alunos
            SET
                nome = 'Vitória Fabinho',
                email = 'vitoria@dev.com',
                senha = 'amo o fabinho',
                telefone = '11973473571',
                data_nascimento = '2006-12-04',
                serie = '9° EF'
            WHERE id = 4;


SELECT 
    m.id AS id, 
    m.nome_materia AS materia
FROM 
    tbl_alunos a
JOIN 
    tbl_alunos_materias am ON a.id = am.aluno_id
JOIN 
    tbl_materias m ON am.materia_id = m.id
WHERE 
    a.id = 6;
    
    
    
    
    
    

SELECT 
    m.id AS id, 
    m.nome_materia AS materia
FROM 
    tbl_alunos a
JOIN 
    tbl_alunos_materias am ON a.id = am.aluno_id
JOIN 
    tbl_materias m ON am.materia_id = m.id
WHERE 
    a.id = 6;
    
    
    
    
    
    

SELECT 
    m.id AS id, 
    m.nome_materia AS materia
FROM 
    tbl_professor a
JOIN 
    tbl_professor_materias am ON a.id = am.professor_id
JOIN 
    tbl_materias m ON am.materia_id = m.id
WHERE 
    a.id = 1;
    
    
    
    

UPDATE tbl_alunos
SET nome = 'aaaa',
    email = 'aaaaaa@sssss.com',
    senha = '11111',
    telefone = '11998249607',
    data_nascimento = '2018-02-03',
    serie = '3°EM'
WHERE id = 1;

SELECT * FROM tbl_alunos;




SELECT 
    alunos.id AS aluno_id,
    alunos.nome AS aluno_nome,
    mentores.id AS mentor_id,
    mentores.data_ingresso AS mentor_data_ingresso
FROM 
    tbl_aluno_mentor AS aluno_mentor
JOIN 
    tbl_alunos AS alunos ON aluno_mentor.aluno_id = alunos.id
JOIN 
    tbl_mentor AS mentores ON aluno_mentor.mentor_id = mentores.id;
    
    SELECT 
    COUNT(*) AS is_mentor
FROM 
    tbl_aluno_mentor AS aluno_mentor
JOIN 
    tbl_alunos AS alunos ON aluno_mentor.aluno_id = alunos.id
JOIN 
    tbl_mentor AS mentores ON aluno_mentor.mentor_id = mentores.id
WHERE 
    alunos.id = 1;
    
SELECT 
    alunos.id AS aluno_id,
    alunos.nome AS aluno_nome,
    mentores.id AS mentor_id,
    mentores.data_ingresso AS mentor_data_ingresso
FROM 
    tbl_aluno_mentor AS aluno_mentor
JOIN 
    tbl_alunos AS alunos ON aluno_mentor.aluno_id = alunos.id
JOIN 
    tbl_mentor AS mentores ON aluno_mentor.mentor_id = mentores.id;

    
    
    SELECT 
		professores.id AS professor_id,
        professores.nome AS professor_nome,
        mentores.id AS mentor_id,
        mentores.data_ingresso AS mentor_data_ingresso
        FROM 
        tbl_professor_mentor AS professor_mentor
        JOIN
         tbl_professor AS professores ON professor_mentor.professor_id = professores.id
JOIN 
    tbl_mentor AS mentores ON professor_mentor.mentor_id = mentores.id;
    
    select * from tbl_mentor;
    
    
    
    select * from tbl_mentor;



-------------------------------------------------------------------------------------

DELIMITER ;

-- deletar a relação
DELETE FROM tbl_alunos WHERE id IN (2);

SELECT * FROM tbl_alunos WHERE id > 0;
SELECT CAST(LAST_INSERT_ID() AS DECIMAL) AS id FROM tbl_materias LIMIT 1;

DELIMITER //

CREATE TRIGGER apagar_aluno_materias
BEFORE DELETE ON tbl_alunos
FOR EACH ROW
BEGIN
    -- Apagar as matérias relacionadas ao aluno na tabela de relacionamento
    DELETE FROM tbl_alunos_materias WHERE aluno_id = OLD.id;
END //

DELIMITER //

CREATE TRIGGER apagar_professor_materias
BEFORE DELETE ON tbl_professor
FOR EACH ROW
BEGIN
    -- Apagar as matérias relacionadas ao professor na tabela de relacionamento
    DELETE FROM tbl_professor_materias WHERE professor_id = OLD.id;
END //

DELIMITER ;
