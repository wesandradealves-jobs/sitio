import React, { Component, useContext} from 'react';

import {
	Route as ReactDOMRoute,
	RouteProps as ReactDOMRouteProps,
	Redirect,
} from 'react-router-dom';

import Context from '../context/';

interface RouteProps extends ReactDOMRouteProps {
	component: React.ComponentType;
}

const token = localStorage.getItem('token');

const Route: React.FC<RouteProps> = ({
	component: Component,
	...rest
}) => {
	const store = useContext(Context);

	return (
		<ReactDOMRoute
			{...rest}
			render={() => {
		        return token || store.token ? (
		            <Redirect to="/shop"/>
		        ) : (
		            <Component />
		        );		        			
			}}
		/>
	);
};

export default Route;
