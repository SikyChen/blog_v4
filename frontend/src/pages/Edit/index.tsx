import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import frontmatter from '@bytemd/plugin-frontmatter';
import { Editor } from '@bytemd/react';
import withMenu from '../../hoc/withMenu';
import 'highlight.js/styles/default.css'
import './../../assets/bytemd-plugin/themeStyle/smart-blue.css';
import './../../assets/bytemd-plugin/highlightStyle/atom-one-light.css';
import 'bytemd/dist/index.css';
import './style.css';

function Article() {

  const params = useParams();
  const [content, setContent] = useState('');

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

  }

  function generateToolbar() {
    return (
      <div className="margin-top-8 fr">
        <button onClick={handleSave}>保存</button>
      </div>
    )
  }

  return (
    <div className="editor">
      <Editor
        value={content}
        plugins={plugins}
        onChange={handleEditorChange}
      />
      {generateToolbar()}
    </div>
  )
}

export default withMenu(Article);
