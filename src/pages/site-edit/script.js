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
import siteEditPrimary from '@/components/site-edit-primary'
import siteEditRate from '@/components/site-edit-rate'
import siteEditScreens from '@/components/site-edit-screens'
import seoEdit from '@/components/seo-edit'

const data = () => {
	return {
		/**
		* @typedef {Object} Data
		*/
        snackbar: false,
        message: '',
        snackbarStatus: 'success',
        item: null,
        rate: null,
        posts: null,
        images: false,
        components_status: {
        	primary: true,
        	screens: true,
        	rate: true
        },
        currentMenu: 'section-config',
        tabs: [
			{
				name: 'Сайт',
				icon: 'blur_on',
				href: 'config'
			},
			{
				name: 'SEO',
				icon: 'trending_up',
				href: 'seo'
			},
		],
	}
}

const methods = {
	async getSiteData () {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('page \'@/pages/site-edit\' -> method init');
		this.$Progress.start()

		let req = await service.sites.getSite(this.$route.params.id)

		if (req.status == 200 && req.data.status == 'OK') {
			this.item = req.data.data
			this.item.seo.url = this.item.his_url
			this.item.seo.urlID = this.item.id
			this.setRate(this.item.rate)
        } else {
            this.message = 'Ошибка загрузки данных'
            this.snackbarStatus = 'error'
            this.snackbar = true
            this.$log.error('page \'@/pages/site-edit\' -> post req error')
        }

		this.$Progress.finish()
	},

	componentReady (name) {
		return this.components_status[name] = false
	},

	sendForm (data, content=false) {
		this.$root.$emit('siteEditSend')
	},

	async submitForm (data=false) {
		if(!data) return false
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('page \'@/pages/site-edit\' -> method init');

		const req = await service.sites.updateSite(data)

		if (req.status == 200 && req.data.status == 'OK') {
            this.message = 'Данные успешно сохранены'
            this.snackbarStatus = 'success'
            this.snackbar = true
            this.getSiteData()
        } else {
            this.message = req.data.error ? req.data.error : 'Ошибка сохранения данных - ' + req.data.data
            this.snackbarStatus = 'error'
            this.snackbar = true
            this.$log.error('page \'@/pages/site-edit\' -> post req error')
        }
		
		this.$Progress.finish()
	},

	async updateSitesSeo (item) {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('page \'@/pages/site-edit\' -> method init');
		if(!item) return 0

		this.$Progress.start()
		let req = await service.sites.updateSitesSeo(item)

		if (req.status == 200 && req.data.status == 'OK') {
            this.message = 'SEO данные обновлены'
            this.snackbarStatus = 'success'
            this.snackbar = true
            this.getSiteData()
        } else {
            this.message = 'Ошибка загрузки данных'
            this.snackbarStatus = 'error'
            this.snackbar = true
            this.$log.error('page \'@/pages/sites\' -> post req error')
        }

		this.$Progress.finish()
	},

	setForm (name, posts, images) {
		if (!name || !posts) return false
		
		this.$Progress.start()
		
		if (!this.posts) this.posts = {}
		Object.assign(this.posts, posts)
		if (posts.rate) this.posts['rate_count'] = this.setRate(posts.rate)
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

	setRate (item=false) {
		if (!item) return false
		return this.rate = Math.round(((parseInt(item.er_ease_use) +
				parseInt(item.er_services_support) +
				parseInt(item.er_number_members) +
				parseInt(item.er_quality_profiles) +
				parseInt(item.er_safety_antiscam) +
				parseInt(item.er_value_money) +
				parseInt(item.er_features) +
				parseInt(item.er_functionality))/8)*10)/10
	},

	urlTranslite(url=false) {
		// console.log(url);
	}
}

export default {
	name: 'site',
	metaInfo: {
		title: 'Редактирование сайта',
		titleTemplate: '%s - Dating Sites Expert Admin Panel',
		htmlAttrs: {
			lang: 'en'
		}
	},
	data: data,
	computed: {
		itemPrimary () {
			if (!this.item) return null
			return {
				id: this.item.id,
				name: this.item.name,
				url: this.item.url,
				logo: this.item.logo,
				description: this.item.description,
				description_id: this.item.description_id,
				mini_description: this.item.mini_description,
				active: this.item.active,
			}
		},
	},
	/**
	* This page requires the components:<br>
	*/
	components: {
		siteEditPrimary,
		siteEditRate,
		siteEditScreens,
		seoEdit
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