import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

const App = React.lazy(() => import(`./App`));
const Article = React.lazy(() => import(`./pages/Article`));
const Edit = React.lazy(() => import(`./pages/Edit`));
const Page404 = React.lazy(() => import(`./pages/Page404`));

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
    path: "/article/edit",
    element: <Edit />,
  },
  {
    path: "*",
    element: <Page404 />,
  }
]);

export default router;
