import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import NotFoundPage from './pages/NotFoundPage';
import { useAuth } from './hooks/useAuth';

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFoundPage,
  context: {
    authentication: undefined!,
  },
});

declare module '@tanstack/react-router' {}

const App = () => {
  const authentication = useAuth();
  return <RouterProvider router={router} context={{ authentication }} />;
};
export default App;
