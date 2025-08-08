import { useState } from 'react'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import './styles/global.scss';
import Home from './pages/home/Home';
import Products from './pages/products/Products';
import Users from './pages/users/Users';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Menu from './components/menu/Menu';
import Login from './pages/login/Login';
import Product from './pages/product/Product';
import User from './pages/user/User';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient()


function App() {

  // outlet is used to render child routes under main layout outlet is bascially where the parent component renders followed by the child components
  // createBrowserRouter is used to create a router instance that can be used to navigate between different routes in the application
  // RouterProvider is used to provide the router instance to the application
  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <QueryClientProvider client={queryClient}>

              <Outlet />
              </QueryClientProvider>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/users",
          element: <Users />
        },
        {
          path: "/products",
          element: <Products />
        },
        {
          path: "/users/:id",
          element: <User />
        },
        {
          path: "/products/:id",
          element: <Product />
        },
      ]
    },
    {
      path: "login",
      element: <Login />
    }
  ]);

  return (

    <RouterProvider router={router} />
  )
}

export default App





