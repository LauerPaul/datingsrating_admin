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
import seoEdit from '@/components/seo-edit'

const data = () => {
	return {
		/**
		* @typedef {Object} Data
		*/
        snackbar: false,
        message: '',
        snackbarStatus: 'success',
        items: null,
		currentMenu: 'section-list',
		seo: null,
        tabs: [
			{
				name: 'Сайты',
				icon: 'list',
				href: 'list'
			},
			{
				name: 'SEO',
				icon: 'trending_up',
				href: 'seo'
			},
		],
		seoDescs: {
			title: '%item_name% - подставить имя сайта',
			description: '%item_name% - подставить имя сайта',
			og_title: '%item_name% - подставить имя сайта',
			og_description: '%item_name% - подставить имя сайта',
			micro_markup:  '%item_name% - подставить имя сайта',
		}
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
		this.getPageSeoData()
	},

	async getPageSeoData () {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('page \'@/pages/sites\' -> method init');
		this.$Progress.start()
		let req = await service.sites.getSitesSeo()

		if (req.status == 200 && req.data.status == 'OK') {
			this.seo = req.data.data
        } else {
            this.message = 'Ошибка загрузки данных'
            this.snackbarStatus = 'error'
            this.snackbar = true
            this.$log.error('page \'@/pages/sites\' -> post req error')
        }

		this.$Progress.finish()
	},

	async updateSitesSeo (item) {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('page \'@/pages/sites\' -> method init');
		if(!item) return 0

		this.$Progress.start()
		let req = await service.sites.updateSitesSeo(item)

		if (req.status == 200 && req.data.status == 'OK') {
            this.message = 'SEO данные обновлены'
            this.snackbarStatus = 'success'
            this.snackbar = true
            this.getPageSeoData()
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
            this.message = 'Ошибка обновления данных'
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
            this.message = 'Ошибка при создании новой записи'
            this.snackbarStatus = 'error'
            this.snackbar = true
            this.$log.error('page \'@/pages/sites\' -> post req error')
        }
		
		this.$Progress.finish()
	},

	async removeItem (item) {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('component \'@/components/sites-list\' -> method init');
		if(!item) return 0
		this.$Progress.start()
		
		let data_ = service.formData(item, false)
		const req = await service.sites.removeSite(data_)
		
		if (req.status == 200 && req.data.status == 'OK') this.getPageData()
        else {
            this.message = 'Ошибка при попытке удалить данные - ' + req.data.data
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
		seoEdit,
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