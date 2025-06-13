import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Home from "./Homepage.jsx";
import Details from "./Details.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <div>Oops! Page not found. <a href="/">Go Home</a></div>,
  },
  {
    path: "/details/:gameId",
    element: <Details />,
  },

],
  {
    basename: "/GameVault",
  }
  );
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
