import React from 'react';

// import { Container } from './styles';

const SVG = ({
	color = '#7e9395',
	click,
	style = {
		shapeRendering: 'geometricPrecision',
		textRendering: 'geometricPrecision',
		imageRendering: 'optimizeQuality',
		width: '1rem',
		height: '1rem',
	},
}) => (
	<svg
		onClick={click}
		fill={color}
		style={style}
		xmlns="http://www.w3.org/2000/svg"
		xmlSpace="preserve"
		version="1.1"
		viewBox="0 0 668 375"
		x="0px"
		y="0px"
		fillRule="evenodd"
		clipRule="evenodd"
	>
		<defs />
		<g>
			<path
				className="fil0"
				d="M363 363l293 -292c16,-17 16,-43 0,-59 -16,-16 -43,-16 -59,0l-263 263 -263 -263c-17,-16 -43,-16 -59,0 -16,16 -16,42 0,59l292 292c17,16 43,16 59,0z"
			/>
		</g>
	</svg>
);

export default SVG;
