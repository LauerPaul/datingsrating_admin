/**
*   @version 1.0 beta
*   @module @/pages/review-edit
*   @desc <strong>Review Edit Page</strong>
*   @see ~/pages/review-edit
*
*   @author Pavel Lauer (front-end developer markline.agency)
*   @copyright 2018©Markline.Agency
*/
import service from '@/services/appServices'
import reviewEditPrimary from '@/components/review-edit-primary'

const data = () => {
	return {
		/**
		* @typedef {Object} Data
		*/
        snackbar: false,
        message: '',
        snackbarStatus: 'success',
        item: null,
        components_status: {
        	primary: true,
        	rate: true
        },
        currentMenu: 'section-primary',
        tabs: [
			{
				name: 'Основное',
				icon: 'blur_on',
				href: 'primary'
			},
			{
				name: 'Рейтинг',
				icon: 'trending_up',
				href: 'rate'
			},
		],
	}
}

const methods = {
	async getReviewData () {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('page \'@/pages/review-edit\' -> method init');
		this.$Progress.start()

		this.item = {
			"id": 1,
			"name": 'Nick Decker',
			"date": '2017-08-12',
			"overview": 'text 1',
			"liked": 'text 2',
			"disliked": 'text 3',
			"rate_count": 9.8,
			"active": 1
		}

		// let req = await service.sites.getSite(this.$route.params.id)

		// if (req.status == 200 && req.data.status == 'OK') {
        // } else {
            // this.message = 'Ошибка загрузки данных'
            // this.snackbarStatus = 'error'
            // this.snackbar = true
            // this.$log.error('page \'@/pages/review-edit\' -> post req error')
        // }

		this.$Progress.finish()
	},

	componentReady (name) {
		return this.components_status[name] = false
	},

	sendForm (data, content=false) {
		this.$root.$emit('reviewEditSend')
	},

	async submitForm (data=false) {
		if(!data) return false
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('page \'@/pages/review-edit\' -> method init');

		// const req = await service.sites.updateSite(data)

		// if (req.status == 200 && req.data.status == 'OK') {
            // this.message = 'Данные успешно сохранены'
            // this.snackbarStatus = 'success'
            // this.snackbar = true
            // this.getReviewData()
        // } else {
            // this.message = req.data.error ? req.data.error : 'Ошибка сохранения данных - ' + req.data.data
            // this.snackbarStatus = 'error'
            // this.snackbar = true
            // this.$log.error('page \'@/pages/review-edit\' -> post req error')
        // }
		
		this.$Progress.finish()
	},
	setForm (name, posts, images) {
		if (!name || !posts) return false
		
		this.$Progress.start()
		
		if (!this.posts) this.posts = {}
		Object.assign(this.posts, posts)
		if (images && !this.images) this.images = []
		if (images && Array.isArray(images)) {
			for(let i of images) this.images.push(i)
		} else if (images) this.images.push(images)

		this.components_status[name] = true

		for (let item in this.components_status) {
			if (!this.components_status[item]) return false
		}

		if (this.posts) {
			let data = service.formData(this.posts, this.images)
			return this.submitForm(data)
		}
	},
}

export default {
	name: 'review',
	metaInfo: {
		title: 'Редактирование отзыва',
		titleTemplate: '%s - Dating Sites Expert Admin Panel',
		htmlAttrs: {
			lang: 'en'
		}
	},
	data: data,
	computed: {
		itemPrimary () {
			if (this.item) {
				return {
					id: this.item.id,
					active: parseInt(this.item.active) ? 1 : 0,
					name: this.item.name,
					date: this.item.date
				}
			} else return false
		}
	},
	/**
	* This page requires the components:<br>
	*/
	components: {
		reviewEditPrimary
	},
	/**
	* @desc ▶ Hook reporting <br>
	* <strong style="color:red; font-size: 18px;">ⓘ</strong>
	* @event module:@/pages/review-edit~PAGE <strong>Home</strong> mounted
	*/
	mounted: function(){
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_MOUNTED) this.$log.info('page \'@/pages/review-edit\' -> mounted');
		this.getReviewData()
	},
	methods: methods
}