import React, { useContext, useEffect, InputHTMLAttributes } from 'react';
import { useHistory } from "react-router-dom";

import { 
	Button,
 	Arrow
} from './styles';

interface IBackto extends InputHTMLAttributes<HTMLInputElement> {
	placeholder: any;
}

export const Backto: React.FC<IBackto> = ({ placeholder }) => {
	const history = useHistory();

	const handleClick = (e) => {
		history.goBack();
	} 	

	return (
		<Button onClick={e => history.goBack()}><Arrow>&#187;</Arrow> {placeholder}</Button>
	);
};
