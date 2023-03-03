import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [oldContent, setOldContent] = useState('');

  useEffect(() => {
    initContent();
  }, []);

  async function initContent() {
    if (!params?.id) {
      setContent(articleFront);
      setOldContent(articleFront);
      return;
    };
    
    const res = await props.post('getArticle', { id: params.id });
    if (!res.data) {
      alert('文章不存在');
      setContent(articleFront);
      setOldContent(articleFront);
      return;
    }
    setContent(res.data.content);
    setOldContent(res.data.content);
  }

  async function handleSave() {
    if (content === oldContent) {
      return alert('未做修改');
    }

    const front = fm(content);
    let info: any = front.attributes;

    if (params?.id) {
      info.id = params.id;
    };

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

    // 拼接新文本
    const newFrontMatter = `---\n${dump(info)}---\n\n`;
    const newContent = newFrontMatter + front.body;

    // 提交
    const res = await props.post('updateArticle', {
      info,
      content: newContent,
    }, {
      loading: true,
    });

    setContent(newContent);
    setOldContent(newContent);
    navigate(`/admin/edit/${res.data.info.id}`);
  }

  function generateToolbar() {
    return (
      <div className="editor-toolbar">
        <button onClick={handleSave}>保存</button>
      </div>
    )
  }

  function handleEditorChange(value: string) {
    setContent(value);
  }

  const plugins = useMemo(() => {
    return [
      gfm(),
      highlight(),
      frontmatter(),
    ]
  }, []);

  return (
    <div className="editor-page">
      {generateToolbar()}
      <div className="editor-wrapper">
        <Editor
          value={content}
          plugins={plugins}
          onChange={handleEditorChange}
        />
      </div>
    </div>
  )
}

export default withMenu(Edit);
