import React from 'react';

const SVG = ({
  color = '#222329', style = {
    width: '3.2rem',
    height: '3.2rem',
  },
}) => (

  <svg fill={color} style={style} xmlns="http://www.w3.org/2000/svg" width="31.66" height="31.66" viewBox="0 0 31.66 31.66">
    <defs />
    <path className="a" d="M29.909,31.66a1.743,1.743,0,0,1-1.239-.512l-9.06-9.062a12.264,12.264,0,1,1,2.477-2.477l9.062,9.06a1.751,1.751,0,0,1-1.239,2.991ZM12.264,3.5a8.76,8.76,0,1,0,8.759,8.761A8.771,8.771,0,0,0,12.264,3.5Z" transform="translate(0 0)" />
  </svg>

);

export default SVG;
