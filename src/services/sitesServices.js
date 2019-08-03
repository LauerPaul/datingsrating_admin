import axios from 'axios'

export default {
	/**
	*   Запрос списка сайтов
	*   @method getSites
	*   @return {object} - результат
	**/
	getSites () {
		return axios({
				url: '/sites/get_sites/',
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
	*   Запрос списка сайтов
	*   @method getSitesSeo
	*   @return {object} - результат
	**/
	getSitesSeo () {
		return axios({
			url: '/sites/get_sites_seo/',
			method: 'GET',
			withCredentials: true,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			responseType: 'json',
		})
	},

	/**
	*   Запрос списка сайтов
	*   @method updateSitesSeo
	*   @return {object} - результат
	**/
	updateSitesSeo (data) {
		return axios({
			url: '/sites/update_sites_seo/',
			method: 'POST',
			withCredentials: true,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			responseType: 'json',
			data: data
		})
	},

	/**
	*   Запрос сайта
	*   @method getSites
	*   @return {object} - результат
	**/
	getSite (id) {
		return axios({
				url: '/sites/get_site/'+id,
				method: 'GET',
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                responseType: 'json'
		})
	},

	/**
	*   Запрос переключения статуса активности сайта
	*   @method siteStatusToggle
	*   @return {object} - результат
	**/
	siteStatusToggle (data) {
		return axios({
				url: '/admin/sites/active_site/',
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
	*   Добавить новый сайт
	*   @method addNewSite
	*   @return {object} - результат
	**/
	addNewSite () {
		return axios({
				url: '/admin/sites/add_site/',
				method: 'GET',
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
					'Content-Type': 'multipart/form-data'
                },
                responseType: 'json',
		})
	},

	/**
	*   Удалить сайт
	*   @method removeSite
	*   @return {object} - результат
	**/
	removeSite (data) {
		return axios({
				url: '/admin/sites/remove_site/',
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
	*   Обновить сайт
	*   @method updateSite
	*   @return {object} - результат
	**/
	updateSite (data) {
		return axios({
				url: '/admin/sites/update_site/',
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