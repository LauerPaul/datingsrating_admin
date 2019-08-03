/**
*   @version 1.0 beta
*   @module @/components/site-edit-screens
*   @desc <strong>Component Site Edit Screens</strong>
*   @see ~/components/site-edit-screens
*
*   @author Pavel Lauer (front-end developer markline.agency)
*   @copyright 2018©Markline.Agency
*/
const data = () => {
	return {
		screens: null,
		preview: false,
		imagesNew: null,
		imageFile: null,
		selectImage: null,
		newScreens: null,
		removeScreens: null
    }
}

const methods = {
	setData () {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('component \'@/components/site-edit-screens\' -> method init');
		this.screens = this.items ? JSON.parse(this.items) : this.items
	},

	imageNewSet (event) {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('component \'@/components/site-edit-screens\' -> method init');
		if (this.newScreens == null) this.newScreens = []
		if (this.imagesNew == null) this.imagesNew = []
		this.newScreens.push(event.target.files[0])
		this.imagesNew.push(URL.createObjectURL(event.target.files[0]))
	},

	submitForm () {
		let logo = null
		let name = "screen_"
		let posts = {
			screens: this.screens == null ? '' : this.screens,
		}
		
		if (this.removeScreens !== null) posts.remove_screens = this.removeScreens

		if (this.imagesNew) {
			logo = []
			for (var i = 0; i < this.newScreens.length; i++) {
				logo.push(this.newScreens[i])
				logo[i].key = name + i
			}
		}

		this.$emit('sendData', 'screens', posts, logo)
	},

	removeImage (i=null, new_=false) {
		if (!i == null) return false
		if(new_) this.imagesNew.splice(i, 1);
		else {
			if (this.removeScreens == null) this.removeScreens = []
			this.removeScreens.push(this.screens[i])
			this.screens.splice(i, 1)
		}
	},
}

export default {
	name: 'siteEditScreens',
	data: data,
	computed: {
		imageVal () {
			if(this.imageNew) return this.imageNew
			else return this.$root.domain + (this.items.logo ? this.items.logo : '/uploads/noimage.png')
		},
	},
	props: ['items'],
	/**
	* @desc ▶ Hook reporting <br>
	* <strong style="color:red; font-size: 18px;">ⓘ</strong>
	* @event module:@/components/site-edit-screens~COMPONENT <strong>Site Edit</strong> mounted
	*/
	mounted: function(){
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_MOUNTED) this.$log.info('component \'@/components/site-edit-screens\' -> mounted');		
		this.setData()
	},
	created () {
		this.$root.$on('siteEditSend', this.submitForm);
		this.$emit('componentReady', 'screens')
	},
	methods: methods,
	watch: {
		items () {
			this.setData()
		}
	}
}