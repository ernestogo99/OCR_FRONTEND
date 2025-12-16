import { createBrowserRouter } from "react-router-dom";
import { Documents, Login, Register, Upload } from "../pages";
import { Sidebar } from "../shared/components";

export const route = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/",
    element: <Sidebar />,
    children: [
      {
        path: "/upload",
        element: <Upload />,
      },
      {
        path: "/meus_arquivos",
        element: <Documents />,
      },
    ],
  },

  {
    path: "/cadastrar",
    element: <Register />,
  },

  { path: "*", element: <Login /> },
]);
