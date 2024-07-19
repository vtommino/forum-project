import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";
import MainContainer from "../layouts/MainContainer";

const LoginPage = lazy(() => import("../pages/LoginPage"));
const ForumMainPage = lazy(() => import("../pages/ForumMainPage"));
const AdminPage = lazy(() => import("../pages/AdminPage"));
const ThreadPage = lazy(() => import("../pages/ThreadPage"));
const PostPage = lazy(() => import("../pages/PostPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainContainer />,
    children: [
      // { path: "/admin", element: <AdminPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/forum", element: <ForumMainPage /> },
      { path: "/forum/thread/:threadId", element: <ThreadPage /> },
      { path: "/forum/thread/post/:postId", element: <PostPage /> },
    ],
  },
]);

//separate the route
// path "user"

//Separate admin
// { path: "/admin", element: <AdminPage /> },

export default function Router() {
  return <RouterProvider router={router} />;
}
