const sql = require('mssql');
const configuracaoSQL = require('./models/ConexaoSQL');

const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const SECRET = 'ProvIna'

//var Aluno = Object.create(null);

module.exports = {
  
    async SQL_Login (request, response){
        
        const {Email, Senha} = request.body; 

        const token = jwt.sign({Email: Email}, SECRET, {expiresIn: 100000})

        console.log("Email: ", Email);
  
        var conn = new sql.ConnectionPool(configuracaoSQL);
        
        conn.connect(function(err){
  
          if (err) throw err;
  
          console.log("Conectado!")
          
          var req =  new sql.Request(conn);
    
          var comando = `SELECT * FROM ProvIna_Database.dbo.Aluno WHERE Email = '${Email}'`;
          
          req.query(comando, function (err, resposta) {
            
            if (resposta.recordset.length == 0){       
                response.json({auth: false, message: 'Aluno não cadastrado',token: null});
            }
            else if (resposta.recordset[0].Senha == Senha ){
        
                response.json({auth: true, message: 'Válido', token: token});
            }
            else response.json({auth: false, message: 'Senha inválida',token: null});
            
            conn.close();
          });  
      });
  }
}