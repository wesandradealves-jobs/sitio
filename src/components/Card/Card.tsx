import React, { InputHTMLAttributes, useEffect, useContext, useState } from 'react';

import { 
	Action,
	Expand,
	Description,
	ExtraInfo,
	ProductInfo,
	Counter,
	Qti,
	Button,
	Price,
	CardFooter,
	Thumbnail,
	Category,
	CardTitle,
	CardWrapper
} from './styles';

import Context from '../../context/';

import ico from '../../assets/expand.png';

interface ICard extends InputHTMLAttributes<HTMLInputElement> {
	data:any;
	onClick?: any;
}

export const Card: React.FC<ICard> = ({ data, onClick }) => {
	const _ = require('lodash');
	const store = useContext(Context);
	const [categories, setCategories] = useState<any>([]);
	let [isExpanded, doExpand] = useState<boolean>(false);

	const replaceItem = (arr) => {
		return {
			with: function(arr2) {
				return _.map(arr, item => {
					return _.find(arr2, obj => obj.name === item.name) || item
				})
			}
		}
	}
	  
	const handleCounter = (e) => {
		let i = [...e.target.parentElement.children].indexOf(e.target);

		let $this = store.data.filter((o:any, index:number) => {
			return o.name == data.name
		}).map((o:any, index:number) => {
			return {
				...o,
				qti: i == 1 ? (o.qti > 0 ? o.qti-=1 : o.qti) : o.qti+=1
			}
		})[0];

		return $this;
	} 	

	useEffect(() => {
		let categories : string[] = [];

		for (var i = 0; i < data.category.length; ++i) {
			let item = store.categories.filter((o:any) => {
				return o.id === data.category[i];
			}).map((o:any) => {
				return o.name;
			})[0];

			if(item&&!categories.includes(item)) {
				categories.push(item);
			}
		}

		setCategories(categories);
	}, []);

	return (
		<> 
			<CardWrapper> 
				<Category>{data.category}</Category>
				<Thumbnail img={data.thumbnail}> 
					<Expand onClick={e => doExpand(!isExpanded)} src={ico} />
					<ProductInfo isExpanded={isExpanded}> 
						<CardTitle title={data.name}>
							<span>{data.name}</span> 
							<ExtraInfo>
								{/* {data.brand ? `${data.brand} - ` : ''}  */}
								{/* {data.packageType ? `${data.packageType} - ` : ''} */}
								{data.qtd ? `${data.qtd} - ` : ''}
								{/* {data.packageOptions.weight ? `${data.packageOptions.weight} - ` : ''} */}
								{data.cert ? `${data.cert}` : ''}
							</ExtraInfo> 
						</CardTitle>
						<Description isExpanded={isExpanded}>{data.description}</Description>
					</ProductInfo>
				</Thumbnail>
				<CardFooter> 
					<Price>R${parseFloat(data.price).toFixed(2)}</Price>
					<Counter> 
						<Qti>{data.qti}</Qti>
						<Action>
							<Button onClick={e => onClick(handleCounter(e))}>+</Button>
							<Button onClick={e => onClick(handleCounter(e))}>-</Button>
						</Action>
					</Counter>
				</CardFooter>
			</CardWrapper>
		</>
	);
};
