import axios from 'axios'
import querystring from 'querystring'

export default {
	/**
	*   Запрос данных главной страницы
	*   @method getHomePageParams
	*   @return {object} - результат
	**/
	getHomePageParams () {
		return axios({
				url: '/sitepages/get_main_page',
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
		// let _data = querystring.stringify(data)
		
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
		// let _data = querystring.stringify(data)
		
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

	/**
	*   Запрос списка сайтов
	*   @method getSites
	*   @return {object} - результат
	**/
	getSites () {
		return axios({
				url: '/sites/get_sites',
				method: 'GET',
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                responseType: 'json',
				data: {}
		})
	},

	formData (posts, files) {	
		if (files || posts) {
			const data = new FormData()
			if (files) {
				for(let file of files) {
					if (file.key) data.append(file.key, file, file.name)
					else console.log('Не найден ключ для $_FILES - file.key')
				}
			}
			if (posts) {
				Object.entries(posts).forEach(([key, value]) => {
					if (typeof(value) == 'object') {
						let val_ = ''
						data.append(key, JSON.stringify(value))
					} else data.append(key, value)
				})
			}
			return data
		} else return false
	}
}