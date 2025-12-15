import { createBrowserRouter } from "react-router-dom";
import { Login, Register } from "../pages";
import { Sidebar } from "../shared/components";

export const route = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/",
    element: <Sidebar />,
    children: [],
  },

  {
    path: "/cadastrar",
    element: <Register />,
  },

  { path: "*", element: <Login /> },
]);
