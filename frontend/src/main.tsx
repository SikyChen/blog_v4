import { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import {  RouterProvider } from 'react-router-dom';
import { getRouters } from './router';
import './index.css'
import { post } from './tools/http';
import Loading from './components/Loading';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Suspense>
    <Loading />
    <RouterProvider router={getRouters({ post })} />
  </Suspense>
)
