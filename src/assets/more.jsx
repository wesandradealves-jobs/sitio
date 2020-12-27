import React from 'react';

const SVG = ({ color = '#495e84', style = {}, click }) => (
	<svg
		onClick={click}
		fill={color}
		style={style}
		xmlns="http://www.w3.org/2000/svg"
		width="4.042"
		height="16.17"
		viewBox="0 0 4.042 16.17"
	>
		<defs />
		<path
			className="a"
			d="M4.042,194.021A2.021,2.021,0,1,1,2.021,192,2.021,2.021,0,0,1,4.042,194.021Zm0,0"
			transform="translate(0 -185.936)"
		/>
		<path
			className="a"
			d="M4.042,2.021A2.021,2.021,0,1,1,2.021,0,2.021,2.021,0,0,1,4.042,2.021Zm0,0"
		/>
		<path
			className="a"
			d="M4.042,386.021A2.021,2.021,0,1,1,2.021,384,2.021,2.021,0,0,1,4.042,386.021Zm0,0"
			transform="translate(0 -371.873)"
		/>
	</svg>
);

export default SVG;
