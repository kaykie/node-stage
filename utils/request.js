const request = require("request");
const TIME_OUT = 30000;

let baseRequest = request.defaults({
  timeout: TIME_OUT
});

module.exports = {
  get get() {
    return url => {
      return new Promise((resolve, reject) => {
        baseRequest.get({ url: url }, (error, response, body) => {
          if (error) {
            reject(error);
          }
          resolve(body);
        });
      });
    };
  },
  // 从ES处拿数据 需要调用此方向
  get postES() {
    return (options, useResponse = false) => {
      return new Promise((resolve, reject) => {
        baseRequest.post({...options,auth: {
          user: 'elastic',
          pass: 'B01#0fafEA',
          sendImmediately:false // 如果401是否重试 false为不重试
        },body:JSON.stringify(options.body)}, (error, response, body) => {
            if (error) {
              reject(error);
            }
            const parseBody = JSON.parse(body);
            if (parseBody.error) {
              reject(parseBody.error.reason)
            }
            if (!useResponse) {
              resolve(parseBody);
            }
            resolve({
              body:parseBody,
              response
            });
        });
      });
    };
  },
  get post() {
    return (options, useResponse = false) => {
      return new Promise((resolve, reject) => {
        baseRequest.post({...options,body:JSON.stringify(options.body)}, (error, response, body) => {
          if (error) {
            reject(error);
          }
          if (!useResponse) {
            resolve(JSON.parse(body));
          }
          resolve({
            body:JSON.parse(body),
            response
          });
        });
      });
    };
  }
};