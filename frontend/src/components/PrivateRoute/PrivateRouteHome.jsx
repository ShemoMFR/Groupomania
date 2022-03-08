/* LIBRAIRIES */ 
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

/* PAGES */ 
import Home from '../../pages/Home/Home';

const PrivateRoute = () => {

    const auth = localStorage.getItem("token") // determine if authorized, from context or however you're doing it

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return auth ? <Navigate to="/accueil" /> : <Outlet /> ;
}

export default PrivateRoute;
