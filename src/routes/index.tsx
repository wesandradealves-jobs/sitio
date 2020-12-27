import React, { Component } from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Link
} from 'react-router-dom';

import Route from './Route';
 
import MainLayout from '../layouts/MainLayout';

//import NotFound from './../pages/NotFound/NotFound';
//import SignIn from './../pages/SignIn/SignIn';
//import Shop from './../pages/Shop/Shop';
//import Checkout from './../pages/Checkout/Checkout';
//import ProtectedRoute from './ProtectedRoute';
import asyncComponent from '../components/Spinner';

const NotFound = asyncComponent(() =>
    import('./../pages/NotFound/NotFound').then(module => module.default)
)

const SignIn = asyncComponent(() =>
    import('./../pages/SignIn/SignIn').then(module => module.default)
)

const Shop = asyncComponent(() =>
    import('./../pages/Shop/Shop').then(module => module.default)
)

const Checkout = asyncComponent(() =>
    import('./../pages/Checkout/Checkout').then(module => module.default)
)

const ProtectedRoute = asyncComponent(() =>
    import('./ProtectedRoute').then(module => module.default)
)

const Routes: React.FC = () => { 
  return (
    <MainLayout>
      <Switch>
        <Route exact={true} path="/" component={SignIn} />
        <ProtectedRoute exact={true} path="/shop" component={Shop} />
        <ProtectedRoute exact={true} path="/checkout" component={Checkout} />
        <Route exact={true} path="*" component={NotFound} />
      </Switch>
    </MainLayout>
  )
};

export default Routes;
