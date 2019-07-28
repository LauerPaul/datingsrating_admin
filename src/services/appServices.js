import axios from 'axios'
import home from '@/services/homeServices'
import sites from'@/services/sitesServices'

export default {
	home,
	sites,
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