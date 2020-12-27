import styled, { css } from 'styled-components';

interface ICheckout {
	isShown?:boolean;
}


export const Container = styled.div`
	padding-top: 40px;
	display: flex;
	align-items: stretch;
	border-bottom: 1px #5c8024 dashed;
	padding-bottom: 60px;
	flex-flow: column;
	@media screen and (min-width: 814px) {
		flex-flow: row;
	}
`;

export const Sidebar = styled.aside`
	flex: 0 0 auto;
	width: 100%;
	padding: 30px 0 0;
	@media screen and (min-width: 814px) {
		width: 338px;
		padding: 30px 0px 0 30px;
	}
`;

export const SidebarTitle = styled.h4`
	font-family: "Domine";
	font-weight: 400;
	color: #5c8024;
	font-size: 1.2rem;
	margin-bottom: 15px;
`;

export const Modal = styled.div<ICheckout>`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 999;
	display: ${({ isShown }) => (isShown ? 'flex' : 'none')};
	flex-flow: column;
	justify-content: center;
	align-items: center;
	padding: 30px;
	background-color: rgba(255,255,255,.8)
`;

export const ModalInner = styled.div`
	width: 100%;
	max-width: 555px;
	padding: 60px 40px;
	text-align: center;
	background-color: #faebd5;
	box-shadow: 0px 0px 10px -6px black;	
	button {
		padding: 12px 24px;
		font-size: 1rem;
		border-radius: 0;
		background-color: #506945 !important;
		color: #bec392;
		text-transform: initial;
	}	
`;

export const ModalText = styled.p`
	font-size: 1rem;
	margin: 40px auto;
	line-height: 1.6;
	color: #3f3f3f;
	width: 100%;
	max-width: 328px;
`;

export const ModalTitle = styled.h4`
	font-family: 'Sofia', cursive;
	color: #506945;
	font-weight: 400;
	font-size: 1.8rem;
	border-bottom: 1px #5c8024 dashed;
	padding-bottom: 5px;
	position: relative;
`;

export const Bird = styled.img`
	position: absolute;
	right: 0;
	bottom: 0;
`;

export const CheckoutForm = styled.div`
	form {
		margin: 30px 0 0;
		.type--radio {
			label {
				color: #803206;
				font-weight: bold;
			}
			&:nth-child(2) {
				margin-bottom: 15px;
			}
		}
		> * {
			padding: 0 7.5px 7.5px;
			&:last-child {
				width: 100%;
				padding: 0 0 5px;
				button {
					font-size: 1rem;
					font-weight: 300;
					[class*="label"] {
						line-height: 2;
					}
				}
			}
		}
		table {
			margin: 0 0 30px;
			tr {
				font-size: .8rem;
				&:not(:first-child):not(:last-child) {
					td {
						padding: 5px 0;
					}
				}				
				td {
					color: #5c8024;
					&:last-child {
						text-align: right;
						font-size: 1rem;
						font-weight: bold;
						color: #803206;
					}
				}
			}			
		}
		hr {
			width: 100%;
		}
	}
`;

export const CheckoutTable = styled.table`
	flex: 1;
	background-color: #eee4c6;
	tr {
		td {
			padding: 8px 10px;
			color: #3f3f3f;
			border: 1px #ebbf82 solid;
			font-weight: 400;
			font-size: .75rem;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			&:last-child {
				text-align: center;
				width: 85px;
			}	
			&:first-child {
				&:not(:only-child) {
					width: 50px;
				}
				text-align: center;
			}		
		}
	}
	tbody {
		background-color: #f7ecd1;
		tr {
			&:not(:last-child) {
				td:nth-child(2) {
					font-family: "Domine";
					font-weight: bold;
					color: #803206;
				}
			}
			&:last-child {
				td {
					color: #5c8024;
					border-top-width: 2px;
					&:nth-last-child(2) {
						text-align: right;
					}					
				}
			}
		}
	}
	thead {
		font-family: "Domine";
		td {
			font-weight: bold;
			border-bottom-width: 2px;
		}
	}
	thead, tbody {
		tr {
			&:last-child {
				font-family: "Domine";
				background-color: #fbe9c5;
				td {
					font-weight: bold;
					color: #5c6024;					
					font-size: .8rem;
				}
			}
		}
	}	
`;