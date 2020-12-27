import React, { useContext } from 'react';

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

const ProtectedRoute: React.FC<RouteProps> = ({
	component: Component,
	...rest
}) => {
	const store = useContext(Context);
	return (
		<ReactDOMRoute
			{...rest}
			render={() => {
		        return !!store.token || !!token ? (
		            <Component />
		        ) : (
		            <Redirect to="/" />
		        );
			}}
		/>
	);
};

export default ProtectedRoute;
