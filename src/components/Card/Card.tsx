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
}

export const Card: React.FC<ICard> = ({ data }) => {
	const store = useContext(Context);
	const [categories, setCategories] = useState<any>([]);
	let [count, doCount] = useState<number>(0);
	let [isExpanded, doExpand] = useState<boolean>(false);

	const handleCounter = (e) => {
		let i = [...e.target.parentElement.children].indexOf(e.target);
		doCount(i == 1 ? (count > 0 ? count-=1 : count) : count+=1);

		let products = store.data;

		let $this = store.data.filter((o:any) => {
			return o.id === data.id 
		}).map((o:any) => {
			return {
				...o,
				qti: count
			}
		})[0];

		store.data.find(o => o.id == data.id).qti = count;

		store.setCart(store.data.filter((o:any) => {
			return o.qti > 0
		}));

		// localStorage.setItem('cart', JSON.stringify(store.cart));
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
	}, [store, data]);

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
							<Button onClick={e => handleCounter(e)}>+</Button>
							<Button onClick={e => handleCounter(e)}>-</Button>
						</Action>
					</Counter>
				</CardFooter>
			</CardWrapper>
		</>
	);
};
