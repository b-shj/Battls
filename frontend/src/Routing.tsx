/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import LandingMain from './LandingPage/LandingMain'
import App from './App'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './Reducers';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// -- TODO --
// State doesnt reset when signout occurs
// Local State && Sessions for persistence
// Popular Posts
// Watch/Favorite List

// Main Routing Component
const Routing: React.FC = () => {
    const auth = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    return ( 
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={() => (auth.authorized ? <App /> : <LandingMain />)} />
            </Routes>
        </BrowserRouter>)
  }
  
  export default Routing;

  