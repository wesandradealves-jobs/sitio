import React, { InputHTMLAttributes, useEffect } from 'react';

import { 
	Spin,
	Container
} from './styles';

interface ISpinner extends InputHTMLAttributes<HTMLInputElement> {
	isShown?: any;
	color?: any
}

export const Spinner: React.FC<ISpinner> = ({ color, isShown }) => {
	return (
		<Container show={isShown}>
			<Spin color={color}></Spin>
		</Container>
	);
};

export default Spinner;