const fs = require('fs');
const path = require('path');

const listJsonPath = path.join(__dirname, './../blog/list.json');
const mdPath = path.join(__dirname, './../blog/md/');

const apis = {
  test(content) {
    return {
      a: 1,
      b: 2,
      content: content,
    }
  },

  async updateArticle(content) {
    const { info, content: articleContent } = content;

    try {

      info.fileName = `${info.title}.md`;

      // 改
      const oldInfo = global.articleListMap[info.id];
      if (oldInfo) {
        if (oldInfo.title !== info.title) {
          fs.renameSync(path.join(mdPath + oldInfo.fileName), path.join(mdPath + info.fileName));
        }
        fs.writeFileSync(path.join(mdPath + info.fileName), articleContent);
        global.articleList = global.articleList.map(article => article.id === info.id ? info : article);
        global.articleListMap[info.id] = info;
      } else {
        const id = (Number(global.articleList[0]?.id || -1) + 1).toString();
        info.id = id;
        info.pv = 0;
        fs.writeFileSync(path.join(mdPath + info.fileName), articleContent);
        global.articleList.unshift(info);
        global.articleListMap[id] = info;
      }

      fs.writeFile(listJsonPath, JSON.stringify(global.articleList), (err) => {
        console.error(err);
      });

      return { info };
    } catch (error) {
      console.error(error);
      return {
        data: null,
        message: '保存失败',
      }
    }
  },

  // 删
  async deleteArticle(content) {
    const info = global.articleListMap[content.id];
    try {
      fs.unlinkSync(path.join(mdPath + info.fileName));
      delete global.articleListMap[content.id];
      global.articleList = global.articleList.filter(article => article.id !== info.id);
      fs.writeFile(listJsonPath, JSON.stringify(global.articleList), (err) => {
        console.error(err);
      });
      return { info };
    } catch (error) {
      console.error(error);
      return {
        data: null,
        message: '删除失败',
      }
    }
  },

  // 查
  async getArticle(content) {
    const info = global.articleListMap[content.id];

    if (!info) {
      return {
        data: null,
        message: '文章不存在',
      }
    }

    const articleContent = fs.readFileSync(path.join(mdPath + info.fileName));
    return {
      data: {
        content: articleContent.toString(),
        info,
      },
      message: null,
    };
  },

  async getArticleList() {
    return {
      data: {
        list: global.articleList,
      },
      message: null,
    }
  },
}

module.exports = function handleApi(ctx) {
  let { apiName, content } = ctx.request.body;
  if (apiName && apis[apiName]) {
    return apis[apiName].bind(ctx)(content);
  } else {
    throw Error(`[错误] { apiName: '${apiName}' }, 找不到此 apiName`);
  }
}
