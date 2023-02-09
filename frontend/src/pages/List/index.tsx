import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import loadingStore from '../../components/Loading/loadingStore';
import { Props } from './../../types';
import './style.css';

function List(props: Props) {

  const [list, setList] = useState([]);

  useEffect(() => {
    getArticleList();
  }, []);

  async function getArticleList() {
    const res = await props.post('getArticleList', null, { loading: true });
    setList(res.data.list);
  }

  const handleDelete = async (item: any) => {
    loadingStore.setLoading(true);
    const res = await props.post('deleteArticle', { id: item.id }, { loading: true });
    console.log(res);
    getArticleList();
    loadingStore.setLoading(false);
  }

  function generateAdminButtons(item: any) {
    if (!props.isAdmin) return null;
    return (
      <div className="edit-buttons">
        <Link target="_blank" to={`/admin/edit/${item.id}`}>编辑</Link>
        <a onClick={() => handleDelete(item)}>删除</a>
      </div>
    )
  }

  function generateItem(item: any) {
    return (
      <div key={item.id} className="list-item">
        {generateAdminButtons(item)}
        <div className="list-head">
          <span className="list-time">{new Date(item.crtime).toLocaleString()}</span>
        </div>
        <div className="list-title"><Link to={`/article/${item.id}`}>{item.title}</Link></div>
        <div className="list-description">{item.description}</div>
      </div>
    );
  }

  return (
    <div className="list">
      { list.map(item => generateItem(item)) }
    </div>
  )
}

export default List;
