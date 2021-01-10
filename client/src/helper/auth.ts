import Axios from 'axios'

const token_key = 'storageVide_token'


export function setToken (token:string){

	localStorage.setItem(token_key,token)
}

export function getToken (){

	return localStorage.getItem(token_key)
}

export function deletToken(){

	localStorage.removeItem(token_key)
}

export function initAxiosInterceptors (){


	 Axios.interceptors.request.use(function (config){

		let token = getToken()

		if(token){

			config.headers.Authorization = `bearer ${token}`
		}

		return config
	})

	 Axios.interceptors.response.use(
	 	function (response){
	 		return response
	 	},
	 	function (err){

	 		if (err.status === 401){
	 			deletToken()
				 window.location.href = '/login'
				

	 		}else{

	 			return Promise.reject(err)
	 		}
	 	})
}