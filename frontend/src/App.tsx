import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Props } from './types';
import './App.css';
import List from './pages/List';

function App(props: Props) {
  let location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(location.pathname.replaceAll('/', '') === 'admin');
  }, []);

  async function handleSync() {
    const res = await props.post('syncToGibhub', null, { loading: true});
    alert(res.message)
  }

  function generateAdminButton() {
    if (!isAdmin) return null;

    return (
      <div className="new-button-wrap">
        <button onClick={handleSync}>同步到 Github</button>
        <Link to="/admin/edit" className="margin-left-8"><button>写一篇</button></Link>
      </div>
    )
  }

  return (
    <div className="App">
      <div className="logo-image">
        <div className="title">SIKY BLOG</div>
      </div>
      {generateAdminButton()}
      <List {...props} isAdmin={isAdmin} />
    </div>
  )
}

export default App;
