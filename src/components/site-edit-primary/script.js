/**
*   @version 1.0 beta
*   @module @/components/site-edit-primary
*   @desc <strong>Component Site Edit Primary</strong>
*   @see ~/components/site-edit-primary
*
*   @author Pavel Lauer (front-end developer markline.agency)
*   @copyright 2018©Markline.Agency
*/
const data = () => {
	return {
		form: null,
		preview: false,
		imageNew: '',
		imageFile: null,
		active: false
    }
}

const methods = {
	setData () {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('component \'@/components/site-edit-primary\' -> method init');
		this.form = this.item
		this.active = parseInt(this.form.active) ? true : false
	},

	imageNewSet (event) {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('component \'@/components/site-edit-primary\' -> method init');
		this.imageFile = event.target.files[0]
		this.imageNew = URL.createObjectURL(this.imageFile);
	},

	submitForm () {
		let logo = null

		if (this.imageNew) {
			logo = this.imageFile
			logo.key = "logo"
		}

		this.$emit('sendData', 'primary', this.form, logo)
	}
}

export default {
	name: 'siteEditPrimary',
	data: data,
	computed: {
		imageVal () {
			if(this.imageNew) return this.imageNew
			else return this.$root.domain + (this.item.logo ? this.item.logo : '/uploads/noimage.png')
		},
	},
	props: ['item'],
	/**
	* @desc ▶ Hook reporting <br>
	* <strong style="color:red; font-size: 18px;">ⓘ</strong>
	* @event module:@/components/site-edit-primary~COMPONENT <strong>Site Edit</strong> mounted
	*/
	mounted: function(){
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_MOUNTED) this.$log.info('component \'@/components/site-edit-primary\' -> mounted');		
		this.setData()
	},
	created () {
		this.$root.$on('siteEditSend', this.submitForm);
	},
	methods: methods,
	watch: {
		item () {
			this.setData()
		},

		active () {
			this.form.active = this.active ? 1 : 0
		}
	}
}