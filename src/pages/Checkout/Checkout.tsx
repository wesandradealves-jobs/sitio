import React, { useCallback, useContext, useEffect, useState } from 'react';

import emailjs from 'emailjs-com';

import Context from '../../context/';

import { Button } from '@material-ui/core';

import birdUrl from '../../assets/bird.png';

import { 
	Bird,
	Modal,
	ModalInner,
	ModalText,
	ModalTitle,
	CheckoutForm,
	SidebarTitle,
	CheckoutTable,
	Sidebar,
	Container
} from './styles';

import {
	Route as ReactDOMRoute,
	RouteProps as ReactDOMRouteProps,
	useHistory,
} from 'react-router-dom';

import { 
	Dash,
	FooterText,
	Footer
} from './../Shop/styles';

import Form from '../../components/Form';
import Backto from '../../components/Backto';

const Checkout: React.FC = () => {
	const history = useHistory();
	const store = useContext(Context);
	const [modal, setModal] = useState<boolean>(false);
	const user = JSON.parse(localStorage.getItem('user') || '[]');

	const handleTotal = (key, arr) => {
		return arr.reduce((a, b) => a + (b[key] || 0), 0);
	};	    	

	let checkout = [{
		label: 'Desejo que o sítio entre em contato comigo',
		type: 'radio',
		placeholder: '',
		width: '100%',
		value: 'Desejo que o sítio entre em contato comigo',
		name: 'desejo'
	},{
		label: 'Desejo pagar através do meu cartão de crédito',
		type: 'radio',
		placeholder: '',
		width: '100%',
		value: 'Desejo pagar através do meu cartão de crédito',
		name: 'desejo'
	},{
		type: 'text',
		placeholder: 'Número do Cartão',
		value: '',
		mask: '111.1111.1111.1111',
		width: '100%',
		name: 'card_num'
	},{
		type: 'text',
		placeholder: 'Nome',
		value: '',
		width: '100%',
		name: 'nome'
	},{
		type: 'text',
		placeholder: 'E-mail',
		value: '',
		width: '100%',
		name: 'email'
	},{
		type: 'text',
		placeholder: 'Validade',
		value: '',
		width: '70%',
		mask: '11/11',
		name: 'validade'
	},{
		type: 'text',
		placeholder: 'CVV',
		value: '',
		width: '30%',
		name: 'cvv',
		mask: '111'
	}];	

	const handleForm = (s) => {
		store.doLoading(true);

		if(!s.email || s.email == '') {
        	store.setSignMsg({
        		status: false,
        		msg: 'Ocorreram erros ao enviar seu formulário ou os campos não foram preenchidos.'
        	});		
        	store.doLoading(false);		
		} else {
			let form : any[] = [];
			form.push(s);

			form = form.map((o:any) => {
				return {
				  ...form[0],
				  qti: handleTotal('qti', store.cart),
				  total: `R$ ${parseFloat(handleTotal('price', store.cart)).toFixed(2)}`
				}
			})[0];		

			emailjs.send(process.env.REACT_APP_EMAILJS_SERVICE_ID, 'template_42ievik', form, process.env.REACT_APP_EMAILJS_USERID)
		    .then(function(response) {
		    	if(response.status==200) {
		    		setModal(!modal);
		    	}
				store.doLoading(false); 
		    }, function(error) {
		       	console.log(error);
		       	store.doLoading(false);
	        	store.setRegisterMsg({
	        		status: false,
	        		msg: error.text
	        	});				       
		    });				

			/*let uri = encodeURIComponent(JSON.stringify(form.map((o:any) => {
				return {
				  ...form[0],
				  qti: handleTotal('qti', store.cart),
				  total: `R$ ${parseFloat(handleTotal('price', store.cart)).toFixed(2)}`,
				  cart: store.cart
				}
			})));

			/*emailjs.send('service_urfbf8t', 'template_hgh39n4', obj, 'user_qYVbsfdo8ncuutijFzhMC')
		    .then(function(response) {
		    	console.log(response);
				store.doLoading(false);
		    }, function(error) {
		       	console.log(error);
		       	store.doLoading(false);
	        	store.setRegisterMsg({
	        		status: false,
	        		msg: error.text
	        	});				       
		    });		*/		

			/*let http = new XMLHttpRequest();

			http.open("GET", `//dev.uppercreative.com.br/sitio-mail-api/index.php?checkout=${uri}`, true);
			http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

			http.send();

			http.onreadystatechange = function() {
				if (http.readyState == 4 && http.status == 200) {
					if(typeof http.responseText == 'string' && http.responseText !== 'Success') {
			        	store.setSignMsg({
			        		status: false,
			        		msg: 'Ocorreram erros ao enviar seu formulário'
			        	});	
					}  else {
						setModal(!modal);
					}
					store.doLoading(false);
				}
			}*/
		}
	}    

	const handleCloseModal = () => {
		setModal(!modal);
		window.location.href = window.location.origin;
	}   		

	useEffect(() => {
		if(!store.cart.length) {
			history.push("/shop");
		}
	}, []);  	

	return (
		<> 
			<Container> 
				<CheckoutTable> 
					<thead>
						<tr>
							<td></td>
							<td>Produto</td>
							<td>Observações</td>
							<td>R$</td>
						</tr>
					</thead>
					<tbody>
						{store.cart.length ? store.cart.map((o:any, index:number) => (
							<tr key={index}>
								<td>{o.qti}</td>
								<td>{o.name}</td>
								<td> 
									{/* {o.brand ? `${o.brand} - ` : ''}  */}
									{/* {o.packageType ? `${o.packageType} - ` : ''} */}
									{o.qtd ? `${o.qtd} - ` : ''}
									{/* {o.packageOptions.weight ? `${o.packageOptions.weight} - ` : ''} */}
									{o.cert ? `${o.cert}` : ''}
								</td>
								<td>R${parseFloat(o.price).toFixed(2)}</td>
							</tr>
						)) : <tr>
								<td colSpan={4}>Seu carrinho está vazio.</td> 
							</tr>} 	
						<tr>
							<td>{handleTotal('qti', store.cart)}</td>
							<td>Quantidade total</td>
							<td>Valor total</td>
							<td>R$ {parseFloat(handleTotal('price', store.cart)).toFixed(2)}</td>
						</tr>								
					</tbody>	
				</CheckoutTable>
				<Sidebar> 
					<SidebarTitle>Como pretende efetuar o pagamento?</SidebarTitle>
					<CheckoutForm> 
						<Form 
							errMsg={store.signMsg.msg}
							extraInformation={[
								{
									label: 'Quantidade de itens',
									value: handleTotal('qti', store.cart)
								},
								{
									label: 'Valor total da compra',
									value: `R$ ${parseFloat(handleTotal('price', store.cart)).toFixed(2)}`
								}								
							]}
							conditional={
								{
									name: 'desejo',
									value: 'Desejo que o sítio entre em contato comigo',
									defaultFields: ['email','nome'],
									hideFields: ['card_num','validade','cvv']	
								}									
							}
							buttonLabel="Enviar pedido" 
							handleSubmit={(s) => handleForm(s)}
							id="checkout" 
							formInputs={checkout.map(o => o.name === 'nome' ? {
								type: 'text',
								placeholder: 'Nome',
								value: user.name,
								width: '100%',
								name: 'nome'
							} : (o.name === 'email') ? {
								type: 'text',
								placeholder: 'E-mail',
								value: user.email,
								width: '100%',
								name: 'email'
							} : o)} /> 
							<Backto placeholder="Voltar" />
					</CheckoutForm>
				</Sidebar>
			</Container>
			<Footer> 
				<FooterText>
					<strong>Observações</strong><br/>
					Carne Orgânica (Resfriada no Vácuo ou Congelada) - Vendidas por peça<br/>
					O valor total poderá sofrer alteração devido ao sobrepeso dos itens em kg e ao frete.<br/>	
					Os produtos poderão sofrer alteração de preço sem aviso prévio.	<br/>			
				</FooterText>
			</Footer>			
			<Modal isShown={modal}>
				<ModalInner>
					<ModalTitle>Obrigado pelo seu pedido! <Bird src={birdUrl} /></ModalTitle>
					<ModalText>Vamos seguir com o processo de pagamento e você receberá um e-mail com a confirmação da sua compra.</ModalText>
					<Button onClick={(s) => handleCloseModal()}>Voltar ao site</Button>
				</ModalInner>
			</Modal>
		</>
	);
};

export default Checkout;
