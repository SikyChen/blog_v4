import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { 
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import Article from './pages/Article';
import Page404 from './pages/Page404';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/article/:id",
    element: <Article />,
  },
  {
    path: "*",
    element: <Page404 />,
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
