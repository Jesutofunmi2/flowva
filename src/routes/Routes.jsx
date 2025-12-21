import { createBrowserRouter, RouterProvider } from "react-router-dom";
import useGetRoutes from "./useGetRoutes";
import Error500 from "../pages/ErrorPages/Error500";

const Routes = ({ children }) => {
  const routes = useGetRoutes();
  const router = createBrowserRouter([
    {
      element: children,
      errorElement: <Error500 />,
      children: routes,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
