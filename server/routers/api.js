const fs = require('fs');
const path = require('path');
const syncBlog = require('../modules/syncBlog');

const listJsonPath = path.join(__dirname, './../../blog_repo/list.json');
const mdPath = path.join(__dirname, './../../blog_repo/md/');

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

      try {
        const oldInfo = global.articleListMap[info.id];
        if (oldInfo) {
          // 改
          if (oldInfo.title !== info.title) {
            fs.renameSync(path.join(mdPath + oldInfo.fileName), path.join(mdPath + info.fileName));
          }
          fs.writeFileSync(path.join(mdPath + info.fileName), articleContent);
          global.articleList = global.articleList.map(article => article.id === info.id ? {...article, ...info} : article);
          global.articleListMap[info.id] = info;
        } else {
          // 增
          const id = (Number(global.articleList[0]?.id || -1) + 1).toString();
          info.id = id;
          info.pv = 0;
          fs.writeFileSync(path.join(mdPath + info.fileName), articleContent);
          global.articleList.unshift(info);
          global.articleListMap[id] = info;
        }
      } catch (error) {
        throw new Error('写入 md 文件失败');
      }

      try {
        fs.writeFileSync(listJsonPath, JSON.stringify(global.articleList));
      } catch (error) {
        throw new Error('同步 Json 目录文件失败');
      }

      return { data: { info }, message: null };
    } catch (error) {
      console.error(error);
      return {
        data: null,
        message: error,
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
      return { data: { info }, message: null };
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

  // 同步到 github
  async syncToGibhub() {
    try {
      await syncBlog();
      return {
        message: '同步成功',
      }
    } catch (error) {
      console.error(error);
      return {
        message: '同步 github 失败',
        error,
      }
    }
  }
}

module.exports = function handleApi(ctx) {
  let { apiName, content } = ctx.request.body;
  if (apiName && apis[apiName]) {
    return apis[apiName].bind(ctx)(content);
  } else {
    throw Error(`[错误] { apiName: '${apiName}' }, 找不到此 apiName`);
  }
}
