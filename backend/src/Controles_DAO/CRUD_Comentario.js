const sql = require('mssql');
const configuracaoSQL = require('../config/ConexaoSQL');

module.exports = {
  
    async SQL_InserirComentario (request, response){
       
      const {Texto, IdAluno, IdArquivo} = request.body; 

      var conn = new sql.ConnectionPool(configuracaoSQL);

      conn.connect(function(err){
  
        if (err) throw err;
  
        console.log("Conectado!")
                  
        var req =  new sql.Request(conn);
    
        var comando = `INSERT INTO [ProvIna_Database].[dbo].[Comentario] (Texto, [DataPostagem], [IdArquivo_Comentario], [IdAluno_Comentario])
                        VALUES ('${Texto}',CONVERT(DATE, GETDATE(), 103),${IdArquivo},${IdAluno});`;
          
        req.query(comando, function (err, resposta) {
            
          if(err) throw err;

            response.json("Comentario inserido.");
            conn.close();
          });
        });
    },

    async SQL_DeletarComentario (request, response){
       
      const IdComentario = request.params.IdComentario;  
     
      console.log("IdComentario",IdComentario)

      var conn = new sql.ConnectionPool(configuracaoSQL);

      conn.connect(function(err){
  
        if (err) throw err;
  
        console.log("Conectado!")
                  
        var req =  new sql.Request(conn);
    
        var comando = `DELETE FROM [ProvIna_Database].[dbo].[Comentario]  WHERE IdComentario = ${IdComentario};`;
          
        req.query(comando, function (err, resposta) {
            
          if(err) throw err;

            response.json("Comentario deletado.");
            conn.close();
          });  
        });
    },

    async SQL_BuscarComentarios (request, response){
       
      const IdArquivo = request.params.IdArquivo;
     
      var conn = new sql.ConnectionPool(configuracaoSQL);

      conn.connect(function(err){
  
        if (err) throw err;
  
        console.log("Conectado!")
                  
        var req =  new sql.Request(conn);
    
        var comando = `	SELECT * FROM [ProvIna_Database].[dbo].[Comentario] 
                        WHERE [IdArquivo_Comentario] = ${IdArquivo};`;
          
        req.query(comando, function (err, resposta) {
            
          if(err) throw err;

            response.json(resposta.recordset);
            conn.close();
          });  
        });
    }
}