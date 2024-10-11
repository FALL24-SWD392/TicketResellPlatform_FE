import { Navigate, Route, Routes } from "react-router-dom";
<<<<<<< HEAD
import { Home, Login, ProfilePage } from "../pages";
=======
import { Home, LoginPage, Register } from "../pages";
>>>>>>> feat/register-account
import { useContext } from "react";
import { AppContext } from "src/context/app.context";
import AdminPage from "src/pages/admin/AdminPage";
// import path from "path";


type RouteType = {
  path: string;
  element: JSX.Element;
};

const publicRoutes: RouteType[] = [
  {
    path: "/",
    element: <Home />,
  },
<<<<<<< HEAD
  {
    path: "/profile",
    element: <ProfilePage />,
  },
=======
 
>>>>>>> feat/register-account
  
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
    element: <AdminPage />, // AdminDashboard
  }
];

const unAuthenticatedRoute: RouteType[] = [
  {
    path: "/login-page",
    element: <LoginPage />,
  },
  {
    path: "/register-page",
    element: <Register />,
  }
];

const Router = () => {
  const {isAuthenticated} = useContext(AppContext);
  const user = JSON.parse(localStorage.getItem("profile") || "{}");
  const router =[
    ...publicRoutes,
    ...(isAuthenticated ? authenicatedRoutes : unAuthenticatedRoute),
    ...(["admin", "staff"].includes(user.sub) ? adminRoutes : []),

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