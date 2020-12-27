import styled from 'styled-components';

export const Container = styled.div`

`;

export const Footer = styled.div`
	padding: 30px 0 0;
	.btn {
		background-color: #506945 !important;
		color: #bec392;
		&:hover {

		}
		font-weight: 300;
		font-size: 1.2rem;
		text-transform: initial;
		border-radius: 0;
		width: 100%;
		max-width: 373px;
		margin: 0 auto;
		display: block;
		[class*="label"] {
			line-height: 2;
		}
	}
`;

export const FooterText = styled.p`
	padding-top: 30px;
	font-size: .8rem;
	line-height: 1.6;
	color: #3f3f3f;
	strong {
		color: #803206;
		font-family: "Domine";
		font-weight: bold;
		font-size: .9rem;
	}
`;

export const Dash = styled.hr`
	border: 1px #8a9f47 dashed;
`;

export const Filter = styled.div`
	display: flex;
	flex-flow: column;
	align-items: stretch;
	justify-content: flex-end;
	margin: 20px auto 10px;
	width: 100%;
	@media screen and (min-width: 814px) {
		flex-flow: row;
		margin: -48px -10px 40px auto;
		max-width: 400px;
	}
	> * {
		flex: 1;
		margin: 0 0 10px;
		@media screen and (min-width: 814px) {
			margin: 0 10px;
		}
	}
`;

export const ProductList = styled.ul`
	display: flex;
	flex-flow: column;
	align-items: stretch;
	margin: 0 0 -20px;
	@media screen and (min-width: 568px) {
		flex-flow: row wrap;
		margin: 0 -10px -20px;
	}
`;

export const ProductListItem = styled.li`
	flex: 0 0 auto;
	width: 100%;
	padding: 0 0 20px;
	@media screen and (min-width: 568px) {
		width: 50%;
		padding: 0 10px 20px;
		@media screen and (min-width: 992px) {
			width: 25%;
		}		
	}	
`;