import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Props } from './types';
import './App.css';
import List from './pages/List';
import imgUrl from './assets/image/balloon.jpeg';

function App(props: Props) {
  let location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(location.pathname === '/admin');
  }, []);

  return (
    <div className="App">
        <div className="logo-image">
          <img src={imgUrl} />
          <div className="title">SIKY的小站</div>
        </div>
        <div className="new-button-wrap">
          {isAdmin && <Link to="/admin/edit"><button>new</button></Link>}
        </div>
        <List {...props} isAdmin={isAdmin} />
    </div>
  )
}

export default App;
