import React, { useCallback, useContext, useEffect, useState } from 'react';

import {
	Route as ReactDOMRoute,
	RouteProps as ReactDOMRouteProps,
	useHistory,
} from 'react-router-dom';

import Context from '../../context/';

import { Button } from '@material-ui/core';

import mockapi from '../../services/mock-api';

import { 
	Dash,
	FooterText,
	Footer,
	Filter,
	ProductListItem,
	ProductList
} from './styles';

import {
  Wrapper
} from '../../layouts/styles';

import Card from '../../components/Card';
import SearchBar from '../../components/SearchBar';
import CategoryFilter from '../../components/CategoryFilter';

const Shop: React.FC = () => {
	const history = useHistory();
	const store = useContext(Context);
	const [filter, setFilter] = useState<any>([]);
	const [products, setProducts] = useState<any>([]);
	const { GoogleSpreadsheet } = require('google-spreadsheet');
	const doc = new GoogleSpreadsheet('1YZmCGzqDldxuOHIcd5nET3_5CNKkple2ZETbb1Q6daE');
	doc.useApiKey('AIzaSyD_Q7vMxljGSQ-KRVH1RoKgB2UHS576QEo');

	const handleFilter = (o: any) => {
		setFilter(o);
	};		

	const handleSubmit = () => {
		history.push("/checkout");
	};	

	useEffect(() => {
		const _ = require('lodash');
		const slugify = require('slugify');
		
		let productsByCategory = _.chain(products)
		.groupBy("category")
		.map((value, key) => ({ category: key, products: value }))
		.value();

		store.setData(products.map((o:any, index:number) => {
			return {
				...o,
				qti: 0				
			}
		}));	
		
		store.setCategories(productsByCategory.map((o:any, index:number) => {
			return {
				id: index,
				isActive: true,
				name: o.category,
				slug: slugify(o.category).toLowerCase()				
			}
		}));
	}, [products]);	  
	
	useEffect(() => {
		async function load() {
			await doc.loadInfo();
			const sheet = doc.sheetsByIndex[0];
			const produtos = await sheet.getRows();		 
			setProducts(produtos.filter((o:any) => {
				return o.name.trim().toLowerCase() !== 'esgotado';
			})); 
		}
		load();		
	}, []);  

	useEffect(() => {
		if(store.data.length&&store.categories.length) {
			store.doLoading(false);
		}
	}, [store]);  		

	return (
		<>
			<Filter>
                <SearchBar 
                  onChange={(s) => handleFilter(s)}
                  filter={['name']}
                  placeholder="Busca por produto..." />		
                <CategoryFilter data={store.categories} onChange={(s) => handleFilter(s)} />	
			</Filter>
			<ProductList>
				{filter.map((o:any, index:number) => (
					<ProductListItem key={index}>  
							<Card data={o} />
					</ProductListItem>
				))} 
			</ProductList>		
			<Footer> 
				<Dash />
				<Button disabled={!store.cart.length} className="btn" onClick={(s) => handleSubmit()}>Conferir e enviar pedido</Button>
				<Dash />
				<FooterText>
					<strong>Observações</strong><br/>
					Carne Orgânica (Resfriada no Vácuo ou Congelada) - Vendidas por peça<br/>
					O valor total poderá sofrer alteração devido ao sobrepeso dos itens em kg e ao frete.<br/>	
					Os produtos poderão sofrer alteração de preço sem aviso prévio.	<br/>			
				</FooterText>
			</Footer>
		</>

	);
};

export default Shop;
