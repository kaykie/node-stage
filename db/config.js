const env = process.env.NODE_ENV;
let mysql_conf = {
  host:'localhost',
  user:'root',
  password:'111',
  port:'3388',
  database:'xnwBlog'
};

if(env === 'development'){
  mysql_conf = {
    host:'localhost',
    user:'root',
    password:'ka**23',
    port:'3306',
    database:'myBlog'
  }
}

if(env === 'production'){
  mysql_conf = {
    host:'localhost',
    user:'root',
    password:'111',
    port:'3306',
    database:'xnwBlog'
  }
}

module.exports = {
  mysql_conf
};


