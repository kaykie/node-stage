const path = require('path');
const fs = require('fs');
const myRequest = require('./request');
const {errorModel} = require('../app/models/resModel')
const crypto = require('crypto');
const baiduKey = 'r4aZ7hXPg0mwpruMwmnzXzGXOUAlKgKU';
const dayjs = require('dayjs');

function paramSerializer(params) {
    if (!params) return '';
    let urlPart = [];
    for (let k in params) {
    let value = params[k];
    urlPart.push(k + '=' + value)
    }
    return urlPart.join('&')
  }


/**
 * 根据经费度获取对应的地名
 * @param {经度,纬度} location 
 */
const getBaiduDetailName = (location) => {
  return myRequest.get({url:`http://api.map.baidu.com/reverse_geocoding/v3/?ak=${baiduKey}&output=json&coordtype=wgs84ll&location=${location}`})
}


const randomWord = (strLength) =>{
  let str = "",
    range = strLength,
    arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  for(var i=0; i<range; i++){
    pos = Math.round(Math.random() * (arr.length-1));
    str += arr[pos];
  }
  return str;
}



const aesEncrypt = (data, key) => {
    const cipher = crypto.createCipher('aes192', key);
    let crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

const aesDecrypt=(encrypted, key)=> {
    const decipher = crypto.createDecipher('aes192', key);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

const handleError = (ctx,err) => {
  if (err.message) {
    ctx.body = new errorModel(err.message);
  } else {
    ctx.body = new errorModel(err);
  }
  throw new Error(err)
}

const cacluNumber = (array) => {
  const arr = [0, 0, 0, 0, 0, 0, 0];
  const oneDayTimeStamp = 3600 * 24 * 1000,start = dayjs().subtract(7,'day').format('YYYY-MM-DD');
  const startTime = dayjs(`${start} 00:00:00`).valueOf();
  array.forEach(item => {
    if ((item - startTime) <= oneDayTimeStamp) {
      arr[0]++
      return
    }
    if (item - startTime < oneDayTimeStamp * 2) {
      arr[1]++
      return
    }
    if (item - startTime < oneDayTimeStamp * 3) {
      arr[2]++
      return
    }
    if (item - startTime < oneDayTimeStamp * 4) {
      arr[3]++
      return
    }
    if (item - startTime < oneDayTimeStamp * 5) {
      arr[4]++
      return
    }
    if (item - startTime < oneDayTimeStamp * 6) {
      arr[5]++
      return
    }
    if (item - startTime < oneDayTimeStamp * 7) {
      arr[6]++
      return
    }
  })
  return arr
}

/**
 * 处理当前值是在什么范围 用于热力图的处理
 * value为 rtt
 * **/
const handleValueBelongRange = (value) => {
  if (value < 200 && value > 0) {
    return 1
  }
  if (value < 400) {
    return 2
  }
  if (value < 600) {
    return 3
  }
  return 4
}

module.exports = {
  randomWord,
  aesEncrypt,
  aesDecrypt,
  getBaiduDetailName,
  handleError,
  cacluNumber,
  handleValueBelongRange
}
