import { StrictMode, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { getRouters } from './router';
import './index.css'
import { post } from './tools/http';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Suspense>
      <RouterProvider router={getRouters({ post })} />
    </Suspense>
  </StrictMode>,
)
