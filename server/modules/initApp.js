const fs = require('fs');
const path = require('path');

async function readArticleList() {
  fs.readFile(path.join(__dirname, '../blog/list.json'), (err, data) => {
    if (err) {
      return console.error('读取目录失败', err);
    }
    global.articleList = JSON.parse(data.toString());
    global.articleListMap = global.articleList.reduce((map, artcile) => {
      map[artcile.id] = artcile;
      return map;
    }, {});
    console.log('读取目录成功');
    console.log(global.articleList)
    console.log(global.articleListMap)
  });
}

module.exports = async function initApp () {
  readArticleList();
}
