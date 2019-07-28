/**
*   @version 1.0 beta
*   @module @/pages/site-edit
*   @desc <strong>Site Edit Page</strong>
*   @see ~/pages/site-edit
*
*   @author Pavel Lauer (front-end developer markline.agency)
*   @copyright 2018©Markline.Agency
*/

import service from '@/services/appServices'
import siteEditComponent from '@/components/site-edit'

const data = () => {
	return {
		/**
		* @typedef {Object} Data
		*/
        snackbar: false,
        message: '',
        snackbarStatus: 'success',
        item: null
	}
}

const methods = {
	async getSiteData () {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('page \'@/pages/site-edit\' -> method init');
		this.$Progress.start()

		let req = await service.sites.getSite(this.$route.params.id)

		if (req.status == 200 && req.data.status == 'OK') this.item = req.data.data[0]
        else {
            this.message = 'Ошибка загрузки данных'
            this.snackbarStatus = 'error'
            this.snackbar = true
            this.$log.error('page \'@/pages/site-edit\' -> post req error')
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
  //           this.$log.error('page \'@/pages/site-edit\' -> post req error')
  //       }
		
		this.$Progress.finish()
	}
}

export default {
	name: 'site',
	metaInfo: {
		title: 'Редактирование сайта',
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
		siteEditComponent
	},
	/**
	* @desc ▶ Hook reporting <br>
	* <strong style="color:red; font-size: 18px;">ⓘ</strong>
	* @event module:@/pages/site-edit~PAGE <strong>Home</strong> mounted
	*/
	mounted: function(){
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_MOUNTED) this.$log.info('page \'@/pages/site-edit\' -> mounted');
		this.getSiteData()
	},
	methods: methods
}