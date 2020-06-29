
const {aesEncrypt,aesDecrypt,getRedis} = require('../utils/publicService')
async function checkUser(ctx,next) {
  if (ctx.path !== '/api/user/login') {
    const tokenRedis = await getRedis('token');
    // const userIdRedis = await getRedis('userId');
    // const decryptToken = aesDecrypt(tokenRedis, '189421'),
      const { headers } = ctx,
      token = headers.authentication;
    if (token && token.split(' ')[1] !== tokenRedis) {
      ctx.response.status = 401;
      ctx.body = {
        message: '出错了'
      };
      ctx.throw(401, 'no token detected in http headerAuthorization');
    }
  }
}




module.exports = function () {
  return async function(ctx,next){
    checkUser(ctx, next);
    await next()
  }
}