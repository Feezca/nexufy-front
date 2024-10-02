import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Layout from "./components/home/Layout";
import ProductItem from "./components/ProductPage/ProductItem";
import CategoryPage from "./components/CategoryPage/CategoryPage";
import { AuthenticationContextProvider } from "./services/authenticationContext/authentication.context";
import Protected from "./components/routes/protected/Protected";
import AdminLayout from "./components/admin/Layout";
import Publications from "./components/admin/components/Publications";
import Profile from "./components/admin/components/Profile";
import Statistics from "./components/admin/components/Statistics";
import CeoLayout from "./components/ceo/Layout";
import AbmShop from "./components/ceo/components/AbmShop";
import AbmUsers from "./components/ceo/components/AbmUsers";
import Notifications from "./components/ceo/components/Notifications";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "product/:id",
          element: <ProductItem />,
        },
        {
          path: "product/category/:id",
          element: <CategoryPage />,
        },
      ],
    },
    {
      path: "/admin",
      element: <Protected />,
      children: [
        {
          path: "",
          element: <AdminLayout />,
          children: [
            {
              path: "datos",
              element: <Profile />,
            },
            {
              path: "publicaciones",
              element: <Publications />,
            },
            {
              path: "estadisticas",
              element: <Statistics />,
            },
          ],
        },
      ],
    },
    {
      path: "/ceo",
      element: <Protected />,
      children: [
        {
          path: "",
          element: <CeoLayout />,
          children: [
            {
              path: "datos",
              element: <Profile />,
            },
            {
              path: "users",
              element: <AbmUsers />,
            },
            {
              path: "products",
              element: <AbmShop />,
            },
            {
              path: "estadisticas",
              element: <Statistics />,
            },
            {
              path: "notificaciones",
              element: <Notifications />,
            },
          ],
        },
      ],
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
  ]);

  return (
    <>
      <AuthenticationContextProvider>
        <RouterProvider router={router} />
      </AuthenticationContextProvider>
    </>
  );
}

export default App;
