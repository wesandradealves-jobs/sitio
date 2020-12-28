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
	return (
		<Container> 
			<Select id="CategoryFilter" onChange={e => onChange(e.target.value)}>
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
