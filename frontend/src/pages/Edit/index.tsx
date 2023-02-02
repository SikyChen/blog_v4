import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import frontmatter from '@bytemd/plugin-frontmatter';
import { Editor } from '@bytemd/react';
import fm from 'front-matter';
import { dump } from 'js-yaml'
import withMenu from '../../components/Menu/withMenu';
import { Props } from '../../types';

import 'highlight.js/styles/default.css'
import './../../assets/bytemd-css/themeStyle/smart-blue.css';
import './../../assets/bytemd-css/themeStyle/github-markdown-dark.css';
import './../../assets/bytemd-css/highlightStyle/atom-one-light.css';
import './../../assets/bytemd-css/highlightStyle/atom-one-dark-reasonable.css';
import 'bytemd/dist/index.css';
import './style.css';

const articleFront = `---
title: 标题
author: Siky
description: 描述
crtime: ${new Date().getTime()}
uptime: ${new Date().getTime()}
tags: JavaScript,Node
---
`;

const mock = `
# abc
## 我的一天
我想写个博客 \`blog\` 的个人网站
\`\`\` js
function abc() {
    console.log(123456)
}
\`\`\`

| Heading | qq |
| --- | --- |
| zz | xx |

![图片](https://pic.rmb.bdstatic.com/bjh/events/fe1ba39b156e356268b0a4ea86ad04ef9959.jpeg@h_1280)

划划水
`

function Edit(props: Props) {

  const params = useParams();
  const [content, setContent] = useState(articleFront + mock);

  const handleEditorChange = (value: string) => {
    setContent(value);
  }

  const plugins = useMemo(() => {
    return [
      gfm(),
      highlight(),
      frontmatter(),
    ]
  }, []);

  const handleSave = async () => {
    const front = fm(content);
    let info: any = front.attributes;

    // 校验
    if (!info) {
      return alert('未写入 frontmatter !');
    }
    if (!info.title) {
      return alert('没有标题');
    }
    if (!info.description) {
      return alert('没有描述');
    }

    // 设置时间
    const now = new Date().getTime();
    if (!info.crtime) {
      info.crtime = now;
    }
    info.uptime = now;

    if (info.tags) {
      info.tags = info.tags.split(',');
    }

    // 拼接新文本
    const newFrontMatter = `---\n${dump(info)}---\n\n`;
    const newContent = newFrontMatter + front.body;

    // 提交
    const res = await props.post('createArticle', {
      info,
      content: newContent,
    });
    console.log('res', res);
    setContent(newContent);
  }

  function generateToolbar() {
    return (
      <div className="margin-bottom-8 text-right">
        <button onClick={handleSave}>保存</button>
      </div>
    )
  }

  return (
    <div className="editor">
      {generateToolbar()}
      <Editor
        value={content}
        plugins={plugins}
        onChange={handleEditorChange}
      />
    </div>
  )
}

export default withMenu(Edit);
