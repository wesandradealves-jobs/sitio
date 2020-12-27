import styled, { css } from 'styled-components';

interface ICard {
	isExpanded?:boolean;
	img?:any;
}

export const CardWrapper = styled.div`
	background-color: #bec392;
	padding: 0 5px 5px 5px;
	height: 100%;
	display: flex;
	flex-flow: column;
	font-family: "Domine";
	> * {
		width: 100%;
	}
`;

export const CardTitle = styled.h3`
	font-size: 1rem;
	color: #803206;
	font-weight: bold;
	flex: 0 0 auto;
	> span {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: block;
	}
`;

export const Category = styled.p`
	padding: 10px 0;
	text-align: center;
	text-transform: uppercase;
	font-size: 1rem;
	color: #516448;
	font-weight: bold;
`;

export const Thumbnail = styled.div<ICard>`
	flex: 1;
	background-size: cover;
	background-position: center center;
	background-repeat: no-repeat;
	display: flex;
	flex-flow: column;
	height: 215px;
	${({ img }) =>
		img &&
		css`
			background-image url(${img});
		`}	
`;

export const CardFooter = styled.div`
	padding: 5px 0 0;
	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;
	align-items: center;
`;

export const Price = styled.p`
	font-sie: 1.3rem;
	font-weight: bold;
	color: #803206;
	padding-left: 20px;
`;

export const Counter = styled.div`
	padding: 5px 10px;
	flex: 0 0 auto;
	display: flex;
	flex-flow: row wrap;
	align-items: stretch;
	justify-content: flex-end;	
	background-color: #d7d7aa;
	min-width: 70px;
`;

export const Button = styled.button`
	background-color: #506945;
	color: #eee4c6;
	font-size: 22px;
	width: 18px;
	line-height: .6;
	cursor: pointer;
	&:not(:last-child) {
		margin-bottom: 5px;
	}
`;

export const Qti = styled.p`
	display: flex;
	flex-flow: column;
	align-items: center;
	justify-content: center;
	color: #516448;
	font-size: 1rem;
	padding-right: 10px;
	font-weight: 400
`;

export const Action = styled.span`
	display: flex; 
	flex-flow: column;
`;

export const Expand = styled.img`
	width: auto;
	position: absolute;
	top: 0;
	right: 0;
	z-index: 2;
	cursor: pointer;
	background: rgba(186,195,146,.6);
	padding: 5px;
	border-radius: 0 0 0 10px;
`;

export const ProductInfo = styled.div<ICard>`
	background-color: #f7ecd1;
	padding: 20px;
	width: 100%;
	margin-top: auto;
	border-top: 5px #bec392 solid;
	transition: 100ms linear max-height;
	overflow: hidden;
	display: block;
	max-height: ${({ isExpanded }) => (isExpanded ? '100%' : '90px')};
`;

export const ExtraInfo = styled.small`
	display: block;
	color: #3f3f3f;
	font-size: inherit;
	margin: 8px 0 0;
	font-size: .8rem
`;

export const Description = styled.p<ICard>`
	font-size: .8rem;
	line-height: 1.6;
	color: #3f3f3f;
	padding-top: 10px;
	margin-top: 10px;
	border-top: ${({ isExpanded }) => (isExpanded ? '1px dashed #6c3314' : '0px')};
	font-family: "Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Tahoma, sans-serif;
	display: block;
	z-index: 1;
`;