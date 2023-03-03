import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Props } from './types';
import './App.css';
import List from './pages/List';
import withMenu from './components/Menu/withMenu';

function App(props: Props) {

  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(location.pathname.replaceAll('/', '') === 'admin');
  }, []);

  async function handleSync() {
    const res = await props.post('syncToGibhub', null, { loading: true});
    alert(res.message)
  }

  async function handleLogout() {
    await props.post('logout', null, { loading: true});
    navigate('/');
  }

  function generateAdminButton() {
    if (!isAdmin) return null;

    return (
      <div className="new-button-wrap">
        <div>
          <Link to="/admin/edit"><button>写一篇</button></Link>
        </div>
        <div>
          <button onClick={handleSync}>同步到 Github</button>
          <button className="margin-left-8" onClick={handleLogout}>登出</button>
        </div>
      </div>
    )
  }

  return (
    <div className="App">
      {/* <div className="logo-image">
        <div className="title">SIKY BLOG</div>
      </div> */}
      {generateAdminButton()}
      <List {...props} isAdmin={isAdmin} />
    </div>
  )
}

export default withMenu(App);
