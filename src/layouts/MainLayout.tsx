import React, { useEffect } from 'react';

import {
	Route as ReactDOMRoute,
	RouteProps as ReactDOMRouteProps,
	useHistory,
	useLocation
} from 'react-router-dom';

import { App, Main } from './styles';

import {
  Section,
  PageTitle,
  Wrapper
} from './styles';

const Layout: React.FC = ({ children }) => {
	const location = useLocation();

	useEffect(() => {
	}, [location]);	

	return (
	<App>
	  <Main>
		<Wrapper> 
		    <PageTitle borderStyle="dashed" color="#5c6024">{location.pathname !== '/checkout' ? 'Faça seu pedido' : 'Confirme seu pedido'}</PageTitle>
	      	{children}
		</Wrapper>      
	  </Main>
	</App>
	);
};

export default Layout;
