const fs = require('fs');
const path = require('path');

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
    return data;
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
    const articleInfo = global.articleListMap[content.id];

    if (!articleInfo) {
      return {
        data: null,
        message: '文章不存在',
      }
    }

    const articleContent = fs.readFileSync(path.join(__dirname, './../' + articleInfo.path));
    return {
      data: {
        content: articleContent.toString(),
        info: articleInfo,
      },
      message: null,
    };
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
