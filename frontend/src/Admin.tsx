import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Login from './pages/Login';
import { Props } from './types';

function App(props: Props) {

  const [ admin, setAdmin ] = useState('');

  useEffect(() => {
    getUser();
  })

  async function getUser() {
    const res = await props.post('getUser', null, { loading: true});
    if (res.message) {
      return setAdmin('0');
    }
    if (res.data?.admin === '1') {
      setAdmin('1');
    }
  }

  const loginProps = {
    ...props,
    setAdmin,
  }

  return (
    <div className="admin">
      {admin === '1' && <Outlet />}
      {admin === '0' && <Login {...loginProps}/>}
    </div>
  )
}

export default App;
