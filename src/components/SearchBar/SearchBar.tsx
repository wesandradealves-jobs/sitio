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
	filter: any;
	onChange: any;	
}

export const SearchBar: React.FC<ISearchBar> = ({ placeholder, filter, onChange }) => {
	const store = useContext(Context);

	const handleFilter = (val: any) => {
	    return store.data.filter(o => {
	      return filter.some(field => o[field].toLowerCase().indexOf(val) >= 0)
	    });
	};	

	const handleChange = (e) => {
		onChange(handleFilter(e.target.value.toLowerCase()));
	} 

	useEffect(() => {
		onChange(store.data);
	}, [store]); 		

	return (
		<Container> 
			<Search>
				<SearchField onChange={e => handleChange(e)} type="text" placeholder={placeholder} />
				<Button>
					<Ico src={ico} />
				</Button>
			</Search> 
		</Container>
	);
};
