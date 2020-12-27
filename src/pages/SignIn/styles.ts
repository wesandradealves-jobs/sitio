import styled from 'styled-components';

export const Container = styled.section`
	padding-top: 60px;
	display: flex;
	flex-flow: column;
	align-items: stretch;
	@media screen and (min-width: 992px) {
		flex-flow: row;
	}
`;

export const Column = styled.div`
	&:not(:last-of-type) {
		padding-bottom: 60px;
		@media screen and (min-width: 992px) {
			border-right: 2px #8a9f47 dashed;
			padding-right: 60px;
			padding-bottom: 0;
		}
	}
	&:not(:first-of-type) {
		@media screen and (min-width: 992px) {
			padding-left: 60px;
		}
	}	
	flex: 1;
	&:first-child {
		flex: 0 0 auto;
	}
`;
