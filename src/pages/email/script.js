/**
*   @version 1.0 beta
*   @module @/pages/email
*   @desc <strong>Email Page</strong>
*   @see ~/pages/email
*
*   @author Pavel Lauer (front-end developer markline.agency)
*   @copyright 2018©Markline.Agency
*/

import service from '@/services/appServices'

const data = () => {
	return {
		/**
		* @typedef {Object} Data
		*/
        snackbar: false,
        message: '',
        snackbarStatus: 'success'
	}
}

const methods = {
	async getPageData () {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('page \'@/pages/email\' -> method init');
		this.$Progress.start()
		/*let req = await service.getHomePageParams()

		if (req.status == 200 && req.data.id) {
			this.form = req.data
			this.form.imageUrl = this.form.imageUrl ? this.$root.domain + this.form.imageUrl : ''
        } else {
            this.message = 'Ошибка загрузки данных'
            this.snackbarStatus = 'error'
            this.snackbar = true
            this.$log.error('page \'@/pages/email\' -> post req error')
        }
*/
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
  //           this.$log.error('page \'@/pages/email\' -> post req error')
  //       }
		
		this.$Progress.finish()
	}
}

export default {
	name: 'EmailPage',
	metaInfo: {
		title: 'E-mail Админов',
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
	},
	/**
	* @desc ▶ Hook reporting <br>
	* <strong style="color:red; font-size: 18px;">ⓘ</strong>
	* @event module:@/pages/email~PAGE <strong>Home</strong> mounted
	*/
	mounted: function(){
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_MOUNTED) this.$log.info('page \'@/pages/email\' -> mounted');
		this.getPageData()
	},
	methods: methods
}