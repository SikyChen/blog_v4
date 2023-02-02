import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Props } from './../../types';
import './style.css';

function List(props: Props) {

  const [list, setList] = useState([]);

  async function getArticleList() {
    const res = await props.post('getArticleList');
    setList(res.data.list);
  }

  useEffect(() => {
    getArticleList();
  }, []);

  function generateItem(item: any) {
    return (
      <div key={item.id} className="list-item">
        <Link to={`/article/${item.id}`} className="list-title">{item.title}</Link>
        <div className="list-description">{item.description}</div>
        <div className="list-crtime">{new Date(item.crtime).toLocaleString()}</div>
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
