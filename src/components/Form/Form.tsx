import React, { useEffect, useContext, useState, InputHTMLAttributes } from 'react';

import {
	Footer,
	ErrMsg,
	Container,
	FormGroup,
	Label
} from './styles';

import { 
	Dash,
} from '../../pages/Shop/styles';

import {
  Subtitle,
  PageTitle
} from '../../layouts/styles';

import { Button, TextField } from '@material-ui/core';

import MaskedInput from 'react-maskedinput';

import Context from '../../context/';

interface IForm extends InputHTMLAttributes<HTMLInputElement> {
  formInputs: any;
  title?: string;
  subtitle?: string;
  id?: any;
  conditional?: any;
  buttonLabel: string;
  errMsg?: any;
  extraInformation?: any;
  handleSubmit: any;
}

export const Form: React.FC<IForm> = ({ id, formInputs, title, subtitle, buttonLabel, errMsg, handleSubmit, extraInformation, conditional }) => {
	const store = useContext(Context);
	const [state, setState] = useState({id: id});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setState(state => ({ ...state, [name]: value }));

		if(conditional) {
			for (var i = 0; i < conditional.defaultFields.length; ++i) {
				if(document.getElementsByName(conditional.defaultFields[i])[0]!==undefined) {
					document.getElementsByName(conditional.defaultFields[i])[0].style.display = "inline-flex";
				}
			}			
			if(conditional.name == name) {
				for (var i = 0; i < conditional.hideFields.length; ++i) {
					if(document.getElementsByName(conditional.hideFields[i])[0] !== undefined) {
						document.getElementsByName(conditional.hideFields[i])[0].style.display = value !== conditional.value ? "inline-flex" : "none";
					}
				}
			}
		}
	}    

	useEffect(() => {
		if(conditional) {
			let fields = conditional.defaultFields.concat(conditional.hideFields);

			for (var i = 0; i < fields.length; ++i) {
				if(document.getElementsByName(fields[i])[0]!==undefined) {
					document.getElementsByName(fields[i])[0].style.display = 'none';
				}
			}
		}
	}, []);  	

	useEffect(() => {
		type Entries<T> = {
		  [K in keyof T]: [K, T[K]]
		}[keyof T][]

		function entries<T>(obj: T): Entries<T> {
		  return Object.entries(obj) as any;
		}

		for (const [key, input] of entries(formInputs)) {
			if(input.value) {
				setState(state => ({ ...state, [input.name]: input.value }));
			}
		}		
	}, []);  		

	return (
		<> 
			{title ? <PageTitle color="#575d30">{title} <Subtitle>{subtitle}</Subtitle></PageTitle> : null}
			<Container name="checkoutForm">
				{formInputs.map((o:any, i:number) => (
					<FormGroup className={`type--${o.type}`} flex={o.width} key={i}> 
						{o.label ? <Label>{o.label}</Label> : null}
						{o.type == 'checkbox' || o.type == 'radio' ? <input value={o.value} required={true} name={o.name} onChange={(e) => handleChange(e)} type={o.type} /> : o.mask ? <MaskedInput required={true} mask={o.mask ? o.mask : ''} name={o.name} onChange={(e) => handleChange(e)} type={o.type} placeholder={o.placeholder} /> 
							: (o.value ? <input required={true} value={o.value} name={o.name} onChange={(e) => handleChange(e)} type={o.type} placeholder={o.placeholder} /> : <input required={true} name={o.name} onChange={(e) => handleChange(e)} type={o.type} placeholder={o.placeholder} />)}
					</FormGroup>
				))}	
				{extraInformation ? <Footer> 
					<tbody>
						<tr>
							<td colSpan={2}><Dash /></td> 
						</tr>
						{extraInformation.map((o:any, index:number) => (
							<tr key={index}>
								<td>{o.label}</td>
								<td>{o.value}</td>
							</tr>
						))} 		
					</tbody>
				</Footer> : null}
				<FormGroup> 
					<Button onClick={e => handleSubmit(state)}>{buttonLabel}</Button>
					{errMsg !== null ? <ErrMsg>{errMsg}</ErrMsg> : null}
				</FormGroup>
			</Container>
		</>
	);
};
