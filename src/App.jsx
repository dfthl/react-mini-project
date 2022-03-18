import React from "react";
import Dashboard from "./pages/dashboard";
import LoginPage from "./pages/auth/login";
import CatalogById from "./pages/catalog/id";
import Catalog from "./pages/catalog/index";
import { Routes, Route, Navigate, BrowserRouter, Outlet } from "react-router-dom";
import Register from "./pages/auth/register";
import UnderConstruction from "./pages/notfound/underConstruction";
import PageNotFound from "./pages/notfound/404";
import Home from "./pages/home";

const RequiredAuth = () => {
  let isAuth = localStorage.getItem('access_token')

  if (!isAuth) {
    return <Navigate to="/"/>
  }
  // outlet is children of private route
  return <Outlet/>
}

export default function App() {

  return(
    <>
    <BrowserRouter>
      <Routes>
        {/* public routes */}
        <Route path="/" >
          <Route path=":id" element={<CatalogById/>} />
          <Route index element={<Catalog/>}/>
        </Route>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<Register/>} />
        {/* <Route path="/register" element={<Register/>} /> */}
        <Route path="/catalog" >
          <Route path=":id" element={<CatalogById/>} />
          <Route index element={<Catalog/>}/>
        </Route>


        
        {/* protected routes pages */}
        <Route element={<RequiredAuth/>}>
          {/* list of requiredAuth Outlet */}
          <Route path="/home" element={<Home/>}></Route>
          <Route index path="/dashboard" element={<Dashboard/>}/>
          <Route path="/analytics" element={<UnderConstruction/>} />
          {/* example another route
          <Route index path="/profile" element={ <Profile/>}/>
          */}
        </Route>
        {/* not found page */}
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}