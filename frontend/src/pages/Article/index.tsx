import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import frontmatter from '@bytemd/plugin-frontmatter';
import { Viewer } from '@bytemd/react';
import withMenu from '../../hoc/withMenu';
import 'highlight.js/styles/default.css'
import './../../assets/bytemd-plugin/themeStyle/smart-blue.css';
import './../../assets/bytemd-plugin/highlightStyle/atom-one-light.css';

import { md } from './mock';

function Article() {

  const params = useParams();

  const plugins = useMemo(() => {
    return [
      gfm(),
      highlight(),
      frontmatter(),
    ]
  }, [])

  return (
    <div className="article">
      <h1>详情页，id是{params.id}</h1>
      <button>切换主题</button>
      <Viewer
        value={md}
        plugins={plugins}
      />
    </div>
  )
}

export default withMenu(Article);
