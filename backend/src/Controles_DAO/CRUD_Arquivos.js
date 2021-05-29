const sql = require('mssql');
const configuracaoSQL = require('./models/ConexaoSQL');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const SECRET = 'ProvIna'

module.exports = {
  
    async SQL_InserirArquivos (request, response){
       
      const {NomeArquivo, Categoria, URls, NumeroCurtidas, IdAluno_Arquivos} = request.body; 
        

      const data = new Date();
      const DataCriacao = data.toLocaleDateString();  
     
      var conn = new sql.ConnectionPool(configuracaoSQL);

      conn.connect(function(err){
  
        if (err) throw err;
  
        console.log("Conectado!")
                  
        var req =  new sql.Request(conn);
    
        var comando = `  INSERT INTO [ProvIna_Database].[dbo].[Arquivo] (IdAluno_Arquivos,NomeArquivo, Categoria, DataCriacao, URLs, NumeroCurtidas)
                          VALUES (${IdAluno_Arquivos},'${NomeArquivo}','${Categoria}',${DataCriacao},'${URls}',${NumeroCurtidas});`;
          
        req.query(comando, function (err, resposta) {
            
          if(err) throw err;

            response.json("Arquivo inserido.");
            conn.close();
          });  
        });
    },

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

        var comando = `SELECT * FROM [ProvIna_Database].[dbo].[Arquivo] `;
          
        req.query(comando, function (err, resposta) {
            
          if(err) throw err;
          console.log("response",resposta.recordset)
          response.json(resposta.recordset);
          
          conn.close();
        });  
      });
    },
    async SQL_BuscarArquivo (request, response){
       
      
      const IdArquivo = request.params.IdArquivo;

      const { IdAluno_Arquivos } = request.query;

      console.log("IdAluno_Arquivos",  request.query)
     
      var conn = new sql.ConnectionPool(configuracaoSQL);

      conn.connect(function(err){
  
        if (err) throw err;
  
        console.log("Conectado!")
                  
        var req =  new sql.Request(conn);
    
        var comando = `SELECT * FROM [ProvIna_Database].[dbo].[Arquivo]
                      WHERE IdAluno_Arquivos = ${IdAluno_Arquivos}
                        AND IdArquivos = ${IdArquivo}`;
          
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
    }
}