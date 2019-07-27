import axios from 'axios'
import querystring from 'querystring'

export default {
	/**
	*   Отправка формы авторизации
	*   @method submitAuthForm
	*   @param data = форма\данные для отправки
	*   @return {object} - результат
	**/
	submitAuthForm (data) {
		let _data = querystring.stringify(data)

		return axios({
                url: '/',
                method: 'POST',
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                responseType: 'json',
                data: _data
            })
	},
}