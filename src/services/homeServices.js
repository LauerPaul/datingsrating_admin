import axios from 'axios'

export default {
	/**
	*   Запрос данных главной страницы
	*   @method getHomePageParams
	*   @return {object} - результат
	**/
	getHomePageParams () {
		return axios({
				url: '/sitepages/get_main_page/',
				method: 'GET',
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                responseType: 'json',
				data: {}
		})
	},
	/**
	*   Запрос сохранения данных главной страницы
	*   @method setHomePageParams
	*   @return {object} - результат
	**/
	setHomePageParams (data) {
		return axios({
				url: '/sitepages/update_main_page/',
				method: 'POST',
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
					'Content-Type': 'multipart/form-data'
                },
                responseType: 'json',
				data: data
		})
	},
	/**
	*   Запрос сохранения текстов главной страницы
	*   @method setHomePageContent
	*   @return {object} - результат
	**/
	setHomePageContent (data) {
		return axios({
				url: '/sitepages/update_main_page_content/',
				method: 'POST',
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
					'Content-Type': 'multipart/form-data'
                },
                responseType: 'json',
				data: data
		})
	},
}