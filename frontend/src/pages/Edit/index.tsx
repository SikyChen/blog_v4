import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import frontmatter from '@bytemd/plugin-frontmatter';
import { Editor } from '@bytemd/react';
import fm from 'front-matter';
import { dump } from 'js-yaml'
import withMenu from '../../components/Menu/withMenu';
import 'highlight.js/styles/default.css'
import './../../assets/bytemd-plugin/themeStyle/smart-blue.css';
import './../../assets/bytemd-plugin/highlightStyle/atom-one-light.css';
import 'bytemd/dist/index.css';
import './style.css';
import { Props } from '../../types';

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
\`\`\` js
function abc() {
    console.log(123456)
}
\`\`\`

| Heading | qq |
| --- | --- |
| zz | xx |

`
let theFile: any = null;
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

  const handleSave = () => {
    console.log('content');
    console.log(content);
    console.log('fm', fm(content));
    dump; // TODO
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
