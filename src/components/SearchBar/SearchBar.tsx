import React, { useContext, useEffect, InputHTMLAttributes } from 'react';

import ico from '../../assets/search.png';

import Context from '../../context/';

import { 
	Search,
	Container,
	SearchField,
	Button,
	Ico
} from './styles';

interface ISearchBar extends InputHTMLAttributes<HTMLInputElement> {
	placeholder: string;
	onChange: any;	
}

export const SearchBar: React.FC<ISearchBar> = ({ placeholder, onChange }) => {
	return (
		<Container> 
			<Search>
				<SearchField onChange={e => onChange(e.target.value.toLowerCase())} type="text" placeholder={placeholder} />
				<Button>
					<Ico src={ico} />
				</Button>
			</Search> 
		</Container>
	);
};
