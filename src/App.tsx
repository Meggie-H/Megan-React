import React from 'react';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import NotFoundPage from './components/NotFoundPage';

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFoundPage,
});

declare module "@tanstack/react-router" {

}

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
