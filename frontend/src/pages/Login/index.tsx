import { useEffect, useState } from 'react';
import { Props } from './../../types';

import './style.css';

export default function Login(props: Props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  async function handleLogin() {
    if (!username || !password) return;

    const res = await props.post('login', { user: username, pwd: password }, { loading: true});
    if (res.message) {
      return setErrMsg(res.message);
    }
    if (res.data?.admin === '1') {
      props.setAdmin('1');
    }
  }

  const handlePwdKeyDown = (event: KeyboardEvent) => {
    console.log('event', event);
    if (event.keyCode === 13 || event.key === 'Enter') {
      handleLogin();
    }
  }

  return (
    <div className="login-page">
      <div className="login">
        <input className="login-input" placeholder="用户名" type="text" onChange={e => setUsername(e.target.value)} />
        <input className="login-input" placeholder="密码" type="password" onChange={e => setPassword(e.target.value)} onKeyDown={e => handlePwdKeyDown(e)} />
        <div>
          <button className="login-button" onClick={handleLogin}>登录</button>
        </div>
        <div className="login-error">{errMsg}</div>
      </div>
    </div>
  )
}
