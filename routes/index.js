const router = require('koa-router')();
const article_controller = require('../app/controllers/article_controller');



router.post('/api/article/add',article_controller.addArticle);




module.exports = router;
