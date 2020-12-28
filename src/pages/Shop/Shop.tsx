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
	const _ = require('lodash');
	const history = useHistory();
	const store = useContext(Context);
	const [categoryFilterString, setCategoryFilter] = useState<String>('Selecione uma categoria');
	const [querySearch, setQuerySearch] = useState<String>();
	const [products, setProducts] = useState<any>([]);
	const { GoogleSpreadsheet } = require('google-spreadsheet');
	const doc = new GoogleSpreadsheet('1YZmCGzqDldxuOHIcd5nET3_5CNKkple2ZETbb1Q6daE');
	doc.useApiKey('AIzaSyD_Q7vMxljGSQ-KRVH1RoKgB2UHS576QEo');

	const handleItem = (o: any) => {
		const hash = require('object-hash');

		const index = _.findIndex(store.data, {name: o.name});
		
		store.data.splice(index, 1, o);

		store.setData(store.data);

		store.setCart(store.data.filter((o:any, index:number) => {
			return o.qti > 0
		}).map((o:any, index:number) => {
			return {
				category: o.category,
				cert: o.cert,
				description: o.description,
				id: o.id,
				name: o.name,
				qtd: o.qtd,
				qti: o.qti,
				thumbnail: o.thumbnail,
				total: o.price * o.qti,
				price: o.price			
			}
		}));

		localStorage.setItem('cart', JSON.stringify(store.cart));
	};		

	const handleCategoryFilter = (o: any) => {
		setCategoryFilter(o);
	};		

	const handleSubmit = () => {
		history.push("/checkout");
	};	

	useEffect(() => {
		const slugify = require('slugify');
		
		let productsByCategory = _.chain(products)
		.groupBy("category")
		.map((value, key) => ({ category: key, products: value }))
		.value();

		if(localStorage.getItem('cart')) {
			const cart = JSON.parse(localStorage.getItem('cart'));
			store.setCart(cart);
			cart.forEach(function(o){
				const index = _.findIndex(products, {name: o.name});
				products.splice(index, 1, o);
			});
		}			

		store.setData(products.map((o:any, index:number) => {
			return {
				...o,
				qti: o.qti ? o.qti : 0				
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
		store.doLoading(true);

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
                  onChange={(s) => setQuerySearch(s)}
                  placeholder="Busca por produto..." />		
                <CategoryFilter data={store.categories} onChange={(s) => handleCategoryFilter(s)} />	
			</Filter>
			<ProductList>
				{store.data.filter((o:any) => {
					if(categoryFilterString !== 'Selecione uma categoria' && !querySearch) {
						return o.category == categoryFilterString;
					} else if(querySearch && categoryFilterString !== 'Selecione uma categoria') {
						return ['name'].some(field => o[field].toLowerCase().indexOf(querySearch) >= 0) && o.category == categoryFilterString
					} else if(querySearch && categoryFilterString == 'Selecione uma categoria') {
						return ['name'].some(field => o[field].toLowerCase().indexOf(querySearch) >= 0)
					}
					return [...store.data]
				}).map((o:any, index:number) => (
					<ProductListItem key={index}>  
						<Card 
						onClick={(s) => handleItem(s)}
						data={o} />
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
