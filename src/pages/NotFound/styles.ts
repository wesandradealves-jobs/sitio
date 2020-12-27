import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-flow: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	padding: 30px 35px;
	min-height: calc(100vh - 626px);
`;

export const Title = styled.h2`
	font-size: 3rem;
	color: #DE8F75;
	font-weight: bold;
`;

export const SubTitle = styled.small`
	font-weight: 400;
	font-size: 60%;
	display: block;
	color: gray;
	margiM: 30px auto 0;
`;
