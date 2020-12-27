import styled, { css } from 'styled-components';

interface ISpinner {
	show?: any;
	color?: any;
}

export const AsyncContainer = styled.div<ISpinner>`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 999;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(0,0,0,.3);
`;

export const Container = styled.div<ISpinner>`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 999;
	width: 100%;
	height: 100%;
	display: ${({ show }) => (show ? 'flex' : 'none')};
	justify-content: center;
	align-items: center;
	background-color: rgba(0,0,0,.3);
`;

export const Spin = styled.div<ISpinner>`
	display: inline-block;
	width: 80px;
	height: 80px;
	&::after {
	  content: " ";
	  display: block;
	  width: 64px;
	  height: 64px;
	  margin: 8px;
	  border-radius: 50%;
	  border: 6px solid #fff;
	  border-color: ${({ color }) => (color ? `${color}` : '#fff')} transparent ${({ color }) => (color ? `${color}` : '#fff')} transparent;
	  animation: lds-dual-ring 1.2s linear infinite;
	}
	@keyframes lds-dual-ring {
	  0% {
	    transform: rotate(0deg);
	  }
	  100% {
	    transform: rotate(360deg);
	  }
	}
`;