import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import frontmatter from '@bytemd/plugin-frontmatter';
import { Viewer } from '@bytemd/react';
import withMenu from '../../components/Menu/withMenu';
import 'highlight.js/styles/default.css'
import './../../assets/bytemd-css/themeStyle/smart-blue.css';
import './../../assets/bytemd-css/themeStyle/github-markdown-dark.css';
import './../../assets/bytemd-css/highlightStyle/atom-one-light.css';
import './../../assets/bytemd-css/highlightStyle/atom-one-dark-reasonable.css';
import './style.css'
import { Props } from '../../types';

function Article(props: Props) {

  const params = useParams();
  const [content, setContent] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    props.post('getArticle', { id: params.id })
      .then((res: any) => {
        if (!res.data) {
          return setError(true);
        }
        setContent(res.data.content);
      });
  }, [params.id]);

  const plugins = useMemo(() => {
    return [
      gfm(),
      highlight(),
      frontmatter(),
    ]
  }, []);

  function generateErrorMessage() {
    if (!error) return null;
    return <h3 style={{ margin: '20vh 0', textAlign: 'center' }}>文章不存在</h3>;
  }

  function generateViewer() {
    if (!content) return null;
    return (
      <Viewer
        value={content}
        plugins={plugins}
      />
    )
  }

  return (
    <div className="article">
      {generateErrorMessage()}
      {generateViewer()}
    </div>
  );
}

export default withMenu(Article);
