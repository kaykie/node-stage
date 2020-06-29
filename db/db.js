const mysql = require('mysql');
const {mysql_conf} = require('./config');

const con = mysql.createConnection(mysql_conf);
con.connect();

function exec(sql) {

  return new Promise((resolve,reject) =>{
    con.query(sql,(err,result) =>{
      if(err){
        reject(err)
      }
      resolve(result);
    })
  })

}

module.exports = {
  exec
};