import React, {useState, useEffect} from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Routes from './routes';

import GlobalStyle from './styles/global';

import Context from './context/';

import mockapi from './services/mock-api';

import Spinner from './components/Spinner/Spinner';

export default function App() {
	const [signMsg, setSignMsg] = useState<any>({});
	const [registerMsg, setRegisterMsg] = useState<any>({});
	const [token, setToken] = useState<any>();
	const [data, setData] = useState<any>([]);
	const [cart, setCart] = useState<any>([]);
	const [categories, setCategories] = useState<any>([]);
	const [isLoading, doLoading] = useState<any>(false);

	useEffect(() => {
		if(signMsg.msg !== null) {
			setTimeout(function(){
				setSignMsg({
					status: null,
					msg: null
				});
			}, 1000);	
		}
		if(registerMsg.msg !== null) {
			setTimeout(function(){
				setRegisterMsg({
					status: null,
					msg: null
				});
			}, 1000);	
		}		
	}, [signMsg, registerMsg]);  

	return (
		<Context.Provider value={{
			doLoading: doLoading,
			isLoading,					
			setCategories: setCategories,
			categories,				
			setCart: setCart,
			cart,			
			setData: setData,
			data,				
			setToken: setToken,
			token,	
			registerMsg: registerMsg,
			setRegisterMsg,					
			signMsg: signMsg,
			setSignMsg					
		}}>
			<BrowserRouter>
				<Routes />
				<Spinner isShown={isLoading} />
			</BrowserRouter>
			<GlobalStyle />
		</Context.Provider>
	);
}
