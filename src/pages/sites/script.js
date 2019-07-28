/**
*   @version 1.0 beta
*   @module @/pages/sites
*   @desc <strong>Sites Page</strong>
*   @see ~/pages/sites
*
*   @author Pavel Lauer (front-end developer markline.agency)
*   @copyright 2018©Markline.Agency
*/

import service from '@/services/appServices'
import sitesList from '@/components/sites-list'

const data = () => {
	return {
		/**
		* @typedef {Object} Data
		*/
        snackbar: false,
        message: '',
        snackbarStatus: 'success',
        items: null
	}
}

const methods = {
	async getPageData () {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('page \'@/pages/sites\' -> method init');
		this.$Progress.start()
		let req = await service.sites.getSites()

		if (req.status == 200 && req.data.status == 'OK') {
			this.items = req.data.data
        } else {
            this.message = 'Ошибка загрузки данных'
            this.snackbarStatus = 'error'
            this.snackbar = true
            this.$log.error('page \'@/pages/sites\' -> post req error')
        }

		this.$Progress.finish()
	},

	async itemStatusToggle (item) {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('component \'@/components/sites-list\' -> method init');
		if(!item) return 0
		
		this.$Progress.start()
		
		let activeText = item.active ? "ON" : "OFF"
		let data = {
			id: item.id,
			active: item.active ? 1 : 0
		}

		data = service.formData(data, false)
		const req = await service.sites.siteStatusToggle(data)

		if (req.status == 200) {
            this.message = `Site: ${item.name} - Status ${activeText}`
            this.snackbarStatus = 'info'
			this.snackbar = true
			this.$Progress.finish()

			for(let i in this.items) if(parseInt(this.items[i].id) == parseInt(item.id)) {
				this.items[i] = req.data.data[0]
				return false
			}
        } else {
            this.$log.error('page \'@/pages/sites\' -> post req error')
            this.message = 'Ошибка загрузки данных'
            this.snackbarStatus = 'error'
			this.snackbar = true
			this.$Progress.finish()
        }
	},

	async newSite () {
		this.$Progress.start()

		const req = await service.sites.addNewSite()

		if (req.status == 200 && req.data.status == 'OK') this.$router.push({ name: 'site', params: { id: req.data.data } })
        else {
            this.message = 'Ошибка сохранения данных - ' + req.data.data
            this.snackbarStatus = 'error'
            this.snackbar = true
            this.$log.error('page \'@/pages/sites\' -> post req error')
        }
		
		this.$Progress.finish()
	}
}

export default {
	name: 'sites',
	metaInfo: {
		title: 'Список сайтов',
		titleTemplate: '%s - Dating Sites Expert Admin Panel',
		htmlAttrs: {
			lang: 'en',
			amp: undefined
		}
	},
	data: data,
	computed: {
	},
	/**
	* This page requires the components:<br>
	*/
	components: {
		sitesList
	},
	/**
	* @desc ▶ Hook reporting <br>
	* <strong style="color:red; font-size: 18px;">ⓘ</strong>
	* @event module:@/pages/sites~PAGE <strong>Home</strong> mounted
	*/
	mounted: function(){
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_MOUNTED) this.$log.info('page \'@/pages/sites\' -> mounted');
		this.getPageData()
	},
	methods: methods
}