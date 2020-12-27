import styled, { css } from 'styled-components';

interface IFilter {
}

export const Container = styled.div`
	display: flex;
	flex-flow: row;
	align-items: center;
	background: #fdf6e6;
	border: 2px #bec392 solid;
	padding: 5px 10px;
`;

export const Button = styled.button`
	flex: 0 0 auto; 
	background: none;
	border: 0;
`;

export const Select = styled.select`
	flex: 1;
	padding-right: 16px;
	margin-right: -16px;	
	cursor: pointer;
	background: transparent;
	height: 23px;
	@media screen and (min-width: 814px) {
		height: auto;
	}
`;

export const Option = styled.option`

`;

export const Ico = styled.img`

`;