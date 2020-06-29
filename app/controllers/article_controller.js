// 文章相关接口的controller
const {
  successModel,
  errorModel,
  successModelList
} = require('../models/resModel');

const { handleError,cacluNumber } = require('../../utils/publicService');
// const { exec } = require('../../db/db');
// const querystring = require('querystring');

// 添加文章
const addArticle = async (ctx, next) => {
  try {
    const { body } = ctx.request, { title, content, createTime, category, is_draft } = body;
    let sql = `insert into article (title,content,create_time,category,views,is_draft) values('${title}','${content}','${createTime}','${category}',1,${is_draft})`
    const result = await exec(sql);
    console.log(result);
    ctx.body = new successModel('操作成功')
  } catch (e) {
    handleError(ctx,e)
  }
};

// // 更新文章
// const updateArticle = async (ctx, next) => {
//   try {
//     const { body } = ctx.request, {title,content,createTime,category,id} = body;
//     let sql = `update article set title='${title}',content='${content}',create_time='${createTime}',category='${category}' where id='${id}'`
//     const result = await exec(sql);
//     console.log(result);
//     ctx.body = new successModel('操作成功')
//   } catch (e) {
//     handleError(ctx,e)
//   }
// };


module.exports = {
  addArticle,
  // updateArticle
}


