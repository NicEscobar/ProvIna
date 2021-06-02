const sql = require('mssql');
const configuracaoSQL = require('../config/ConexaoSQL');

const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const SECRET = 'ProvIna'

const {cloudinary} = require('../config/cloudinary')


module.exports = {

    async SQL_DeletarArquivo (request, response){
       
      const IdArquivo = request.params.IdArquivo; 

      var conn = new sql.ConnectionPool(configuracaoSQL);

      conn.connect(function(err){
  
        if (err) throw err;
  
        console.log("Conectado!")
                  
        var req =  new sql.Request(conn);
    
        var comando = `DELETE FROM [ProvIna_Database].[dbo].[Arquivo]  WHERE IdArquivos = ${IdArquivo};`;
          
        req.query(comando, function (err, resposta) {
            
          if(err) throw err;

            response.json("Arquivo deletado.");
            conn.close();
          });  
        });
    },

    async SQL_BuscarTodosArquivos (request, response){
     
      //let token = request.headers.authorization;

      //jwt.verify(token, SECRET, (err, decoded) => {
        
        //if(err) return response.status(401).end(); 
        
      //})
    
      var conn = new sql.ConnectionPool(configuracaoSQL);

      conn.connect(function(err){
  
        if (err) throw err;
  
        console.log("Conectado!")
                  
        var req =  new sql.Request(conn);

        var comando = `  SELECT [IdArquivos]
                              ,[IdAluno_Arquivos]
                              ,[NomeArquivo]
                              ,[Categoria]
                              ,CONVERT(varchar(10),[DataCriacao],103) AS DataCriacao
                              ,[URLs]
                              ,[Tipo]
                          FROM [ProvIna_Database].[dbo].[Arquivo]`;
          
        req.query(comando, function (err, resposta) {
            
          if(err) throw err;
          //console.log("response",resposta.recordset)
          response.json(resposta.recordset);
          
          conn.close();
        });  
      });
    },
    async SQL_BuscarArquivo (request, response){
            
      const IdArquivo = request.params.IdArquivo;
     
      var conn = new sql.ConnectionPool(configuracaoSQL);

      conn.connect(function(err){
  
        if (err) throw err;
  
        console.log("Conectado!")
                  
        var req =  new sql.Request(conn);
    
        var comando = `  SELECT A.IdArquivos,
                          A.NomeArquivo,
                          A.Categoria,
                          A.URLs,
                          A.DataCriacao,
                          A.Tipo,
                          B.Nome as NomeAluno,
                          count(C.IdComentario) as TotalComentarios
                        FROM [ProvIna_Database].[dbo].[Arquivo] AS A
                          Left JOIN [ProvIna_Database].[dbo].[Aluno] AS B
                           ON A.[IdAluno_Arquivos] = B.IdAluno
                          left JOIN [ProvIna_Database].[dbo].Comentario AS C
                            ON A.[IdAluno_Arquivos] = C.IdArquivo_Comentario
                         WHERE A.IdArquivos = 1
                        Group by A.IdArquivos,A.NomeArquivo,A.Categoria,A.URLs,A.DataCriacao,A.Tipo,B.Nome
                    `;
          
        req.query(comando, function (err, resposta) {
            
          if(err) throw err;

            response.json(resposta.recordsets[0]);

            conn.close();
          });  
        });
    },
    async SQL_BuscarCategoria (request, response){
       
      const {Categoria} = request.query;

     
      var conn = new sql.ConnectionPool(configuracaoSQL);

      conn.connect(function(err){
  
        if (err) throw err;
  
        console.log("Conectado!")
                  
        var req =  new sql.Request(conn);
    
        var comando = `SELECT * FROM [ProvIna_Database].[dbo].[Arquivo]
                       WHERE [Categoria] = '${Categoria}'`;
          
        req.query(comando, function (err, resposta) {
            
          if(err) throw err;

            response.json(resposta.recordset);
        
            conn.close();
          });  
        });
    },
  
    async SQL_InserirArquivos (request, response){

      try {  
        
          //if(err) return response.status(401).end();

          const {Data, NomeArquivo, Categoria, NumeroCurtidas, IdAluno_Arquivos} = request.body;

          const respUpload = await cloudinary.uploader.upload(Data, {
            upload_preset: 'dev_setups'
          })
          
          URls = respUpload.url;
          Tipo = respUpload.format;

          var conn = new sql.ConnectionPool(configuracaoSQL);
    
          conn.connect(function(err){
      
            if (err) throw err;
      
            console.log("Conectado!")
                      
            var req =  new sql.Request(conn);
        
            var comando = `  INSERT INTO [ProvIna_Database].[dbo].[Arquivo] (IdAluno_Arquivos,NomeArquivo, Categoria, URLs, NumeroCurtidas,Tipo, DataCriacao)
                              VALUES (${IdAluno_Arquivos},'${NomeArquivo}','${Categoria}','${URls}',${NumeroCurtidas},'${Tipo}', CONVERT(DATE, GETDATE(), 103));`;
              
            req.query(comando, function (err, resposta) {
                
              if(err) throw err;
              conn.close();
              response.json({message: 'Arquivo Inserido'});
              
              });  
            });
      
      } catch (err){
    
        response.status(500).json({err: 'errou'});

      }
    
      
      
    }
}