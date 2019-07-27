/**
*   @version 1.0 beta
*   @module @/components/seo-edit
*   @desc <strong>Component Seo Edit</strong>
*   @see ~/components/seo-edit
*
*   @author Pavel Lauer (front-end developer markline.agency)
*   @copyright 2018©Markline.Agency
*/

import service from '@/services/appServices'

const data = () => {
	return {
		form: {
			id: 0,
			title: '',
			description: '',

			og_title: '',
			og_description: '',
			og_image: '',

			robots: '',
			micro_markup: '',
			seo: true,
			oldImage: ''
		},
		indexingList: [
			"index,follow",
			"noindex,follow",
			"index,nofollow",
			"noindex,nofollow"
		],
		preview: false,
		imageNew: '',
		imageFile: null,
		clearImage: false,
		imageVal: ''
    }
}

const methods = {
	setData () {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('component \'@/components/seo-edit\' -> method init');
		this.form.id = this.seo.id
		this.form.title = this.seo.title
		this.form.description = this.seo.description
		this.form.og_title = this.seo.og_title
		this.form.og_description = this.seo.og_description
		this.form.og_image = this.seo.og_image
		this.form.robots = this.seo.robots
		this.form.micro_markup = this.seo.micro_markup

		this.imageVal = this.$root.domain + (this.seo.og_image ? this.seo.og_image : '/uploads/noimage.png')
	},
	async sendForm () {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('component \'@/components/seo-edit\' -> method init');
		let ogImage = null
		let data = null		

		if (this.imageNew) {
			ogImage = this.imageFile
			ogImage.key = "og_image"
			data = await service.formData(this.form, [ogImage])
		}
		else data = await service.formData(this.form, false)
		
		this.$emit('submit_form', data)
	},
	imageNewSet (event) {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('component \'@/components/seo-edit\' -> method init');
		if (!event.target.files.length) return false
		this.imageFile = event.target.files[0]
		this.imageNew = URL.createObjectURL(this.imageFile);
		this.imageVal = this.imageNew
		this.form.oldImage = ''
		this.clearImage =  false
	},
	ogImageClear () {
		this.form.oldImage = this.seo.og_image
		this.form.og_image = ''
		this.clearImage = true
		this.imageNew = ''
		this.imageVal = this.$root.domain + '/uploads/noimage.png'
	}
}

export default {
	name: 'seoEdit',
	data: data,
	computed: {
	},
	props: ['seo'],
	/**
	* @desc ▶ Hook reporting <br>
	* <strong style="color:red; font-size: 18px;">ⓘ</strong>
	* @event module:@/components/seo-edit~COMPONENT <strong>Seo Edit</strong> mounted
	*/
	mounted: function(){
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_MOUNTED) this.$log.info('component \'@/components/seo-edit\' -> mounted');		
		this.setData()
	},
	methods: methods,
	watch: {
		seo () {
			this.setData()
		}
	}
}