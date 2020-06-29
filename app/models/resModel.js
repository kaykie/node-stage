class BaseModel {
  constructor(data) {
    if (typeof data === 'string') {
      this.msg = data;
    } else {
      this.data = data; 
      this.msg = '操作成功'
    }
  }
}

class successModel extends BaseModel{
  constructor(data) {
    super(data);
    this.code = '0'
  }
}

class successModelList extends BaseModel{
  constructor(data,page) {
    super(data);
    this.page = page;
    this.code = '0'
  }
}


class errorModel extends BaseModel{
  constructor(data) {
    super(data);
    this.code = '-1';
  }
}


module.exports = {
  successModel,
  errorModel,
  successModelList
};