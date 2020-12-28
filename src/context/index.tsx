import React from "react";

interface IContextProps {
	doLoading?: any;
	isLoading?: any;
	sign?: any;
	doSign?: any;
	registerMsg?: any;
	setRegisterMsg?: any;	
	signMsg?: any;
	setSignMsg?: any;
	token?: any;
	setToken?: any;	
	cart?: any;
	setCart?: any;	
	data?: any;
	setFilter?: any;	
	filter?: any;	
	setData?: any;	
	categories?: any;
	setCategories?: any;				
	dispatch?: ({type}:{type:string}) => void;
}

const Context = React.createContext({} as IContextProps);

export default Context;