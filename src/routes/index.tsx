import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../pages";
import { useContext } from "react";
import { AppContext } from "src/context/app.context";
// import path from "path";


type RouteType = {
  path: string;
  element: JSX.Element;
};

const publicRoutes: RouteType[] = [
  {
    path: "/",
    element: <Home />,
  }
];

const authenicatedRoutes: RouteType[] = [
  {
    path: "/me",
    element: <></>, //Profile
  }
];

const adminRoutes: RouteType[] = [
  {
    path: "/admin",
    element: <></>, // AdminDashboard
  }
];

const unAuthenticatedRoute: RouteType[] = [
  {
    path: "/login",
    element: <></> //Login
  },
  {
    path: "/register",
    element: <></> //Register
  }
];

const Router = () => {
  const {isAuthenticated} = useContext(AppContext);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const router =[
    ...publicRoutes,
    ...(isAuthenticated ? authenicatedRoutes : unAuthenticatedRoute),
    ...(["ADMIN", "STAFF"].includes(user.role) ? adminRoutes : []),
    {
      path: "*",
      element: <Navigate to="/" />,
    }
  ];
  return (
   <Routes>
      {router.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
   </Routes> 
  );
}

export default Router;