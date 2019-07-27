/**
*   @version 1.0 beta
*   @module @/components/banner-edit
*   @desc <strong>Component Banner Edit</strong>
*   @see ~/components/banner-edit
*
*   @author Pavel Lauer (front-end developer markline.agency)
*   @copyright 2018©Markline.Agency
*/

import service from '@/services/appServices'

const data = () => {
	return {
		preview: false,
		titleVal: '',
		textVal: '',
		imageNew: '',
		imageFile: null
    }
}

const methods = {
	brSet (item) {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('component \'@/components/banner-edit\' -> method init');
		this[item] += '<br>'
	},
	setData () {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('component \'@/components/banner-edit\' -> method init');
		this.titleVal = this.title
		this.textVal = this.text
	},
	imageNewSet (event) {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('component \'@/components/banner-edit\' -> method init');
		this.imageFile = event.target.files[0]
		this.imageNew = URL.createObjectURL(this.imageFile);
	},
	async sendForm () {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('component \'@/components/banner-edit\' -> method init');
		let data = null
		let background = null
		let posts = {
				'id': this.id,
				'titleH1': this.titleVal,
				'text': this.textVal,
			}

		if (this.imageNew) {
			background = this.imageFile
			background.key = "background"
			data = await service.formData(posts, [background])
		}
		else data = await service.formData(posts, false)

		this.$emit('submit_form', data)
	},
}

export default {
	name: 'bannerEdit',
	data: data,
	computed: {
		imageVal () {
			if(this.imageNew) return this.imageNew
			else return this.image
		}
	},
	props: ['title', 'text', 'image', 'id'],
	/**
	* @desc ▶ Hook reporting <br>
	* <strong style="color:red; font-size: 18px;">ⓘ</strong>
	* @event module:@/components/banner-edit~COMPONENT <strong>Banner Edit</strong> mounted
	*/
	mounted: function(){
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_MOUNTED) this.$log.info('component \'@/components/banner-edit\' -> mounted');		
	},
	methods: methods,
	watch: {
		title () {
			this.setData()
		},
		text () {
			this.setData()
		},
		image () {
			this.setData()
		}
	}
}