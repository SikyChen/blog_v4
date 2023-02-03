import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import {  RouterProvider } from 'react-router-dom';
import { getRouters } from './router';
import './index.css'
import { post } from './tools/http';
import Loading from './components/Loading';

const globalContext = {
  post,
  isAdmin: false,
}

const GlobalContext = React.createContext(globalContext);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Suspense>
    <Loading />
    <GlobalContext.Provider value={globalContext}>
      <RouterProvider router={getRouters({ post })} />
    </GlobalContext.Provider>
  </Suspense>
)
