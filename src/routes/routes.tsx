import { createBrowserRouter } from "react-router-dom";
import { DocumentChatPage, Documents, Login, Register, Upload } from "../pages";
import { Sidebar } from "../shared/components";
import { ProtectedRoute } from "./protecteroute";

export const route = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },

  {
    element: <ProtectedRoute />,
    children: [
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
          {
            path: "/documents/:id/chat",
            element: <DocumentChatPage />,
          },
        ],
      },
    ],
  },

  {
    path: "/cadastrar",
    element: <Register />,
  },

  { path: "*", element: <Login /> },
]);
