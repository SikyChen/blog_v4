import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Props } from './types';

function App(props: Props) {

  useEffect(() => {
    login();
  })

  async function login() {
    const res = await props.post('login', { user: 'sikychen', pwd: 'libolibo521' }, { loading: true});
  }

  return (
    <div className="admin">
      <Outlet />
    </div>
  )
}

export default App;
