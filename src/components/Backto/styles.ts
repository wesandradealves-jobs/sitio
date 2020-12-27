import styled, { css } from 'styled-components';

interface IBackto {
}

export const Arrow = styled.i`
	transform: rotate(180deg);
	position: relative;
	display: inline-block;
	transform-origin: center center;
	font-style: initial;
	top: 1px;
	margin-right: 3px;
`;

export const Button = styled.button`
	font-family: "Domine";
	color: #803206;
	background: transparent;
	margin-left: auto;
    text-decoration: underline;
    display: block;	
    font-family: .8rem;
    cursor: pointer;
    &:hover {
    	text-decoration: initial
    }
`;