/**
*   @version 1.0 beta
*   @module @/pages/reviews
*   @desc <strong>Reviews Page</strong>
*   @see ~/pages/reviews
*
*   @author Pavel Lauer (front-end developer markline.agency)
*   @copyright 2018©Markline.Agency
*/

import service from '@/services/appServices'
import reviewsList from '@/components/reviews-list'

const data = () => {
	return {
		/**
		* @typedef {Object} Data
		*/
        snackbar: false,
        message: '',
        snackbarStatus: 'success',
        reviews: null
	}
}

const methods = {
	async getPageData () {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('page \'@/pages/reviews\' -> method init');
		this.$Progress.start()

		// TEST DATA
		this.reviews = [
			{
				"id": 1,
				"name": 'Nick Decker',
				"date": '12.08.2017',
				"overview": 'text 1',
				"liked": 'text 2',
				"disliked": 'text 3',
				"rate_count": 9.8,
				"active": 1
			},
			{
				"id": 2,
				"name": 'Nick Decker 2',
				"date": '12.08.2018',
				"overview": 'text 1.1',
				"liked": 'text 2.1',
				"disliked": 'text 3.1',
				"rate_count": 6.5,
				"active": 0
			}
		]

		/*let req = await service.getHomePageParams()

		if (req.status == 200 && req.data.id) {
			this.form = req.data
			this.form.imageUrl = this.form.imageUrl ? this.$root.domain + this.form.imageUrl : ''
        } else {
            this.message = 'Ошибка загрузки данных'
            this.snackbarStatus = 'error'
            this.snackbar = true
            this.$log.error('page \'@/pages/reviews\' -> post req error')
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
  //           this.$log.error('page \'@/pages/reviews\' -> post req error')
  //       }
		
		this.$Progress.finish()
	}
}

export default {
	name: 'ReviewsPage',
	metaInfo: {
		title: 'Отзывы',
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
		reviewsList
	},
	/**
	* @desc ▶ Hook reporting <br>
	* <strong style="color:red; font-size: 18px;">ⓘ</strong>
	* @event module:@/pages/reviews~PAGE <strong>Home</strong> mounted
	*/
	mounted: function(){
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_MOUNTED) this.$log.info('page \'@/pages/reviews\' -> mounted');
		this.getPageData()
	},
	methods: methods
}