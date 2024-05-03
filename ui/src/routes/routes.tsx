import { FC, lazy, LazyExoticComponent, Suspense } from "react";

import * as n from "./navigation";
import LoadingScreen from "../components/Loader/Loader";
const Loadable = (Component: LazyExoticComponent<FC>) => (props: any) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

const Landing = Loadable(lazy(() => import("../pages/Landing/Landing")));
const Dashboard = Loadable(lazy(() => import("../pages/Dashboard/Dashboard")));
const Defects = Loadable(lazy(() => import("../pages/Defects/Defects")));
// 404/Error page
const Error = Loadable(lazy(() => import("../pages/404/404")));

const routes = () => {
  return [
    {
      path: n.HOME,
      element: <Landing />,
    },
    {
      path: n.DASHBOARD,
      element: <Dashboard />,
    },
    {
      path: n.DEFECTS,
      element: <Defects />,
    },
    {
      path: "*",
      element: <Error />,
    },
  ];
};

export default routes;
