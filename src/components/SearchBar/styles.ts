import styled, { css } from 'styled-components';

interface ISeaerchBar {
}

export const Container = styled.form`

`;

export const Search = styled.div`
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

export const SearchField = styled.input`
	flex: 1;
	padding-right: 10px;
	background: transparent;
`;

export const Ico = styled.img`

`;