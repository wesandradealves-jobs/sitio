import React, { useCallback, useContext } from 'react';

import {  
	Container,
	Title,
	SubTitle
} from './styles';

const NotFound: React.FC = () => {
	return (
		<Container>
			<Title>404 <SubTitle>Oops! A página não pode ser encontrada.</SubTitle></Title>
		</Container>
	);
};

export default NotFound;
