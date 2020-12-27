import React, { InputHTMLAttributes, useContext } from 'react';

import Context from '../../context/';

import ico from '../../assets/arrow-down.png';

import { 
	Option,
	Select,
	Container,
	Button,
	Ico
} from './styles';

interface ICategoryFilter extends InputHTMLAttributes<HTMLInputElement> {
	onChange: any;
	data?: any;
}

export const CategoryFilter: React.FC<ICategoryFilter> = ({ onChange, data }) => {
	const store = useContext(Context);
	const _ = require('lodash');

	const handleFilter = (val: any) => {
		if(val == 'Selecione uma categoria') {
			return store.data;
		}
	    return store.data.filter((o:any) => {
			return o.category === val
		});
	};		

	const handleChange = (e) => {
		onChange(handleFilter(e.target.value));
	} 	

	return (
		<Container> 
			<Select onChange={e => handleChange(e)}>
				<Option>Selecione uma categoria</Option>
				{data.map((o:any, index:number) => (
					<Option key={index} value={o.name}>{o.name}</Option>
				))} 				
			</Select> 
			<Button>		
				<Ico src={ico} />
			</Button>
		</Container>
	);
};
