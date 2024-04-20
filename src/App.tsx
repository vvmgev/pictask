import Header from "@components/header";
import Content from "@components/content";
import Footer from "@components/footer";
import Loader from "@components/loader";
import ThemeProvider from "@contexts/theme";
import { lazy, Profiler, Suspense } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "@mockAPI/users";

const Home = lazy(() => import("@pages/Home"));
const UserDetails = lazy(() => import("@pages/UserDetails"));
const Users = lazy(() => import("@pages/Users"));
const Error = lazy(() => import("@components/error"));
const NotFound = lazy(() => import("@components/notFound"));

const router = createBrowserRouter([
  {
    element: (
      <>
        <Header />
        <Content>
          <Outlet />
        </Content>
        <Footer />
      </>
    ),
    ErrorBoundary: Error,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/users/:id",
        element: <UserDetails />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

const App = () => {
  return (
    <div className="min-h-screen transition-colors duration-500 bg-slate-300 dark:bg-gray-800 dark:text-white ">
      <ThemeProvider>
        <Suspense fallback={<Loader />}>
          <RouterProvider router={router} />
        </Suspense>
      </ThemeProvider>
    </div>
  );
};

export default App;
