var development_env = require('./development');
var production = require('./production');

// console.log(process.env.NODE_ENV);
// 根据不同的node_env，输出不同的对象，默认输出dev

module.exports = {
  development:development_env,
  production:production
}[process.env.NODE_ENV || 'development']
