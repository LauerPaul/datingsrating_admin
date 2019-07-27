/**
*   @version 1.0 beta
*   @module @/pages/home
*   @desc <strong>Home Page</strong>
*   @see ~/pages/home
*
*   @author Pavel Lauer (front-end developer markline.agency)
*   @copyright 2018©Markline.Agency
*/
import seoEdit from '@/components/seo-edit'
import bannerEdit from '@/components/banner-edit'
import content from '@/components/homepage-content'

import service from '@/services/appServices'

const data = () => {
	return {
		/**
		* @typedef {Object} Data
		*/
		currentMenu: 'section-banner',
		items: [
			{
				name: 'Banner',
				icon: 'image',
				href: 'banner'				
			},
			{
				name: 'Тексты',
				icon: 'text_format',
				href: 'content'
			},
			{
				name: 'SEO',
				icon: 'trending_up',
				href: 'seo'
			},
		],
		form: {
			id: null,
			titleH1: '',
			text: '',
			seo: {
				title: '',
				keywords: '',
				description: ''
			},
			imageUrl: ''
		},
        snackbar: false,
        message: '',
        snackbarStatus: 'success'
	}
}

const methods = {
	async getPageData () {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('page \'@/pages/home\' -> method init');
		this.$Progress.start()
		let req = await service.getHomePageParams()

		if (req.status == 200 && req.data.id) {
			this.form = req.data
			this.form.imageUrl = this.form.imageUrl ? this.$root.domain + this.form.imageUrl : ''
        } else {
            this.message = 'Ошибка загрузки данных'
            this.snackbarStatus = 'error'
            this.snackbar = true
            this.$log.error('page \'@/pages/home\' -> post req error')
        }

		this.$Progress.finish()
	},

	async submitForm (data, content=false) {
		if (!data) return false
		this.$Progress.start()
		let req = null

		if (content == 'content') req = await service.setHomePageContent(data)
		else req = await service.setHomePageParams(data)

		if (req.status == 200 && req.data.status == 'OK') {
            this.message = 'Данные успешно сохранены'
            this.snackbarStatus = 'success'
            this.snackbar = true
        } else {
            this.message = 'Ошибка сохранения данных - ' + req.data.data
            this.snackbarStatus = 'error'
            this.snackbar = true
            this.$log.error('page \'@/pages/home\' -> post req error')
        }
		
		this.$Progress.finish()
		this.getPageData()
	}
}

export default {
	name: 'HomePage',
	metaInfo: {
		title: 'Главная страница',
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
		seoEdit,
		bannerEdit,
		'homepageContent': content
	},
	/**
	* @desc ▶ Hook reporting <br>
	* <strong style="color:red; font-size: 18px;">ⓘ</strong>
	* @event module:@/pages/home~PAGE <strong>Home</strong> mounted
	*/
	mounted: function(){
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_MOUNTED) this.$log.info('component \'@/pages/home\' -> mounted');
		this.getPageData()
	},
	methods: methods
}