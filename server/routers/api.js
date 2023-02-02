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

  // 增
  async createArticle(content) {
    const { info, content: articleContent } = content;

    try {
      info.fileName = `${info.title}.md`;
      fs.writeFileSync(path.join(mdPath + info.fileName), articleContent);
      const id = (Number(global.articleList[0]?.id || -1) + 1).toString();
      info.id = id;
      info.pv = 0;
      global.articleList.unshift(info);
      global.articleListMap[id] = info;
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
  // async deleteTeam(content) {
  //   if (!content) throw new Error('没有传入队伍信息');
  //   let data = await db.team.delete(content);
  //   console.log('deleteTeam');
  //   return data;
  // },

  // 改
  // async updateTeam(content) {
  //   if (!content) throw new Error('没有传入队伍信息');
  //   let data = await db.team.updateOne(content);
  //   console.log('updateTeam');
  //   return data;
  // },

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
