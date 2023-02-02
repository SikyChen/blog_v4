import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { PublicProps } from './types';

const routerConfigs = [
  {
    path: "/",
    element: lazy(() => import(`./App`)),
  },
  {
    path: "/article/:id",
    element: lazy(() => import(`./pages/Article`)),
  },
  {
    path: "/article/edit",
    element: lazy(() => import(`./pages/Edit`)),
  },
  {
    path: "*",
    element: lazy(() => import(`./pages/Page404`)),
  }
]

function generateRouters(routerConfigs: any, publicProps: PublicProps) {
  if (!routerConfigs) return void 0;
  return routerConfigs.map((config: any) => {
    const Element = config.element;
    const router = {
      ...config,
      element: <Element {...publicProps} />
    }
    if (config.children) {
      router.children = generateRouters(config.children, publicProps);
    }
    return router;
  })
}

export const getRouters = (publicProps: PublicProps ) => {
  return createBrowserRouter(generateRouters(routerConfigs, publicProps));
}
