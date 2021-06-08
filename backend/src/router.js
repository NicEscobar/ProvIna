const { Router } = require('express');
const multer = require('multer');
const multerConfig = require('./utils/multer')

const modulo_cadastro = require('./Controles_DAO/CRUD_cadastro');
const modulo_login = require('./Controles_DAO/CRUD_login');
const modulo_arquivo = require('./Controles_DAO/CRUD_Arquivos');
const modulo_comentario = require('./Controles_DAO/CRUD_Comentario');
const modulo_curtida = require('./Controles_DAO/CRUD_Curtidas');

const modulo_post = require('./Controles_DAO/CRUD_Arquivos');

const routes = Router();

routes.post('/Cadastro', modulo_cadastro.SQL_CadastrarAluno);

routes.post('/Login', modulo_login.SQL_Login); //pendente
//routes.get('/Login', modulo_login.Usuario);

routes. post('/arquivo', multer(multerConfig).single('file'), modulo_arquivo.SQL_InserirArquivos);
routes.delete('/arquivo/:IdArquivo?', modulo_arquivo.SQL_DeletarArquivo);
routes. get('/arquivo/:IdArquivo?', modulo_arquivo.SQL_BuscarArquivo);

routes. get('/arquivoCategoria', modulo_arquivo.SQL_BuscarCategoria);
routes. get('/arquivoTodos', modulo_arquivo.SQL_BuscarTodosArquivos);

routes. get('/Comentario/:IdArquivo?', modulo_comentario.SQL_BuscarComentarios);
routes. post('/Comentario', modulo_comentario.SQL_InserirComentario);
routes. delete('/Comentario/:IdComentario?', modulo_comentario.SQL_DeletarComentario);

routes. post('/Curtida', modulo_curtida.SQL_InserirCurtidas);



module.exports = routes;