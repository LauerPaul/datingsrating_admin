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
		let req = await service.getSites()

		if (req.status == 200) {
			this.items = req.data
        } else {
            this.message = 'Ошибка загрузки данных'
            this.snackbarStatus = 'error'
            this.snackbar = true
            this.$log.error('page \'@/pages/sites\' -> post req error')
        }

		this.$Progress.finish()
	},

	async submitForm (data, content=false) {
		if (!data) return false
		this.$Progress.start()
		let req = null

		// if (content == 'content') req = await service.setHomePageContent(data)
		// else req = await service.setHomePageParams(data)

		// if (req.status == 200 && req.data.status == 'OK') {
  //           this.message = 'Данные успешно сохранены'
  //           this.snackbarStatus = 'success'
  //           this.snackbar = true
  //       } else {
  //           this.message = 'Ошибка сохранения данных - ' + req.data.data
  //           this.snackbarStatus = 'error'
  //           this.snackbar = true
  //           this.$log.error('page \'@/pages/sites\' -> post req error')
  //       }
		
		this.$Progress.finish()
	}
}

export default {
	name: 'sitesList',
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