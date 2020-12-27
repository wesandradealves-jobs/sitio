import React, { useCallback, useContext, useEffect } from 'react';
import { Container } from './styles';
import emailjs from 'emailjs-com';
import {
  PageTitle
} from '../../layouts/styles';

import Form from '../../components/Form';

import {
	Column
} from './styles';

import Context from '../../context/';

import {
	Route as ReactDOMRoute,
	RouteProps as ReactDOMRouteProps,
	useHistory,
} from 'react-router-dom';

import mockapi from '../../services/mock-api';

const SignIn: React.FC = () => {
	const store = useContext(Context);
	const history = useHistory();

	const login = [{
		label: '',
		type: 'text',
		placeholder: '',
		value: '',
		width: '100%',
		name: 'cod_cliente'
	}];

	const cadastro = [{
		label: 'Nome',
		type: 'text',
		placeholder: '',
		value: '',
		width: '100%',
		name: 'nome'
	},{
		label: 'Endereço',
		type: 'text',
		placeholder: '',
		value: '',
		width: '100%',
		name: 'endereco'
	},{
		label: 'Telefone',
		type: 'text',
		placeholder: '',
		value: '',
		mask: '(11) 1 1111-1111',
		width: '50%',
		name: 'telefone'
	},{
		label: 'E-mail',
		type: 'email',
		placeholder: '',
		value: '',
		width: '50%',
		name: 'email'
	},{
		label: 'CPF',
		type: 'tel',
		placeholder: '',
		value: '',
		mask: '111.111.111-11',
		width: '',
		name: 'cpf'
	}];	

	const handleForm = (s) => {
		store.doLoading(true);
		let hash = require('object-hash');
		let slugify = require('slugify');

		if(s.id==='login') {
	      mockapi.get('/users').then(response => {
	        if(response.data) {
	        	let user = response.data.filter((o:any) => {
		            return o.cod_cliente === s.cod_cliente;
		        });


		        if(user.length) {
					let auth = user.map((o:any) => {
						return {
						  ...user[0],
						  hash: hash(user[0])
						}
					})[0];

					localStorage.setItem('token', hash(auth));
					localStorage.setItem('user', JSON.stringify(user.map((o:any) => {
						return {
							cod_cliente: user[0].cod_cliente,
							name: user[0].name,
							email: user[0].email,
							id: user[0].id
						}
					})[0]));

					store.setToken(localStorage.getItem('token'));

					history.push("/shop");
		        }

	        	store.setSignMsg({
	        		status: !user.length ? false : null,
	        		msg: !user.length ? 'Nenhum usuário encontrado' : null
	        	});	

	        	store.doLoading(false);
	        }
	      })	
		} else {
			if(s.nome&&s.email) {
				let obj = {
		         name:s.nome,
		         username:slugify(s.nome.toLowerCase()),
		         password:hash(s.nome),
		         cod_cliente:hash(s.nome),
		         isActive:true,
		         address:s.endereco,
		         cpf:s.cpf,
		         phone:s.telefone,
		         email:s.email
				};			
					
				if(slugify(s.nome.toLowerCase()).indexOf('admin') == 0) {
		        	store.setRegisterMsg({
		        		status: false,
		        		msg: 'Este nome já é reservado pelo sistema.'
		        	});		
		        	store.doLoading(false);
				} else {
				    mockapi.get('/users').then(response => {
				        if(response.data) {
				        	let user = response.data.filter((o:any) => {
					            return o.cod_cliente === slugify(s.nome) || o.cod_cliente === hash(s.nome) || o.email === s.email;
					        });

					        if(user.length) {
					        	store.setRegisterMsg({
					        		status: false,
					        		msg: 'Nome de usuário ou e-mail já existem'
					        	});	
					        } else {
								mockapi.post('/users', obj)
								.then(function (response) {
									if(response.status == 201 && response.statusText == "Created") {
										emailjs.send(process.env.REACT_APP_EMAILJS_SERVICE_ID, 'template_hgh39n4', obj, process.env.REACT_APP_EMAILJS_USERID)
									    .then(function(response) {
									    	console.log(response);
								        	store.setRegisterMsg({
								        		status: true,
								        		msg: 'Usuário criado com sucesso./nSeus dados de login e nome de usuário foram enviados para o email!'
								        	});			
											store.doLoading(false);
									    }, function(error) {
									       	console.log(error);
									       	store.doLoading(false);
								        	store.setRegisterMsg({
								        		status: false,
								        		msg: error.text
								        	});				       
									    });	
									}
								})
								.catch(function (error) {
									console.log(error);
									store.doLoading(false);
								});	
					        }
				        	store.doLoading(false);
				        }
				    })	
				}
			} else {
	        	store.setRegisterMsg({
	        		status: false,
	        		msg: 'Ocorreram erros ao enviar seu e-mail ou campos estão vazios'
	        	});		
	        	store.doLoading(false);
			}
		}
	}   

	return (
		<>
			<Container>
				<Column> 
					<Form 
						errMsg={store.signMsg.msg}
						buttonLabel="Entrar" 
						handleSubmit={(s) => handleForm(s)}
						id="login" 
						title="Já possui cadastro?" 
						subtitle="Então entre com seu código de cliente:" 
						formInputs={login} />
				</Column>
				<Column> 
					<Form errMsg={store.registerMsg.msg} handleSubmit={(s) => handleForm(s)} buttonLabel="Cadastre-se" id="register" title="Ainda não possui cadastro?" subtitle="Entre com seus dados. É rápido!" formInputs={cadastro} /> 
				</Column>				
			</Container>
		</>  
	);
};

export default SignIn;