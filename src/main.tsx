import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router";
import Homepage from "./routes/Homepage";
import PostListPage from "./routes/PostListPage";
import Write from "./routes/Write";
import LoginPage from "./routes/LoginPage";
import RegisterPage from "./routes/RegisterPage";
import SinglePostPage from './routes/SinglePostPage';


const router = createBrowserRouter([
  { path: "/", element: <Homepage/> },
  { path: "/posts", element: <PostListPage/> },
  { path: "/:slug", element: <SinglePostPage/> },
  { path: "/write", element: <Write /> },
  { path: "/login", element: <LoginPage/> },
  { path: "/register", element: <RegisterPage/> },
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
