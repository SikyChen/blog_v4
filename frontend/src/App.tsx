import { useEffect, useState } from 'react';
import { generatePath, Link, useLocation } from 'react-router-dom';
import { Props } from './types';
import './App.css';
import List from './pages/List';
import imgUrl from './assets/image/balloon.jpeg';

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
        <img src={imgUrl} />
        <div className="title">SIKY的小站</div>
      </div>
      {generateAdminButton()}
      <List {...props} isAdmin={isAdmin} />
    </div>
  )
}

export default App;
