/**
*   @version 1.0 beta
*   @module @/components/site-edit
*   @desc <strong>Component Site Edit</strong>
*   @see ~/components/site-edit
*
*   @author Pavel Lauer (front-end developer markline.agency)
*   @copyright 2018©Markline.Agency
*/
const data = () => {
	return {
		form: null,
		preview: false,
		imageNew: '',
		imageFile: null

    }
}

const methods = {
	setData () {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('component \'@/components/site-edit\' -> method init');
		this.form = this.item
	},

	imageNewSet (event) {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('component \'@/components/site-edit\' -> method init');
		this.imageFile = event.target.files[0]
		this.imageNew = URL.createObjectURL(this.imageFile);
	},
}

export default {
	name: 'sitestList',
	data: data,
	computed: {
		imageVal () {
			if(this.imageNew) return this.imageNew
			else return this.$root.domain + (this.item.logo ? this.item.logo : '/uploads/noimage.png')
		},

		rate () {
			return Math.round(((parseInt(this.form.er_ease_use) +
					parseInt(this.form.er_services_support) +
					parseInt(this.form.er_number_members) +
					parseInt(this.form.er_quality_profiles) +
					parseInt(this.form.er_safety_antiscam) +
					parseInt(this.form.er_value_money) +
					parseInt(this.form.er_features) +
					parseInt(this.form.er_functionality))/8)*10)/10
		},
	},
	props: ['item'],
	/**
	* @desc ▶ Hook reporting <br>
	* <strong style="color:red; font-size: 18px;">ⓘ</strong>
	* @event module:@/components/site-edit~COMPONENT <strong>Site Edit</strong> mounted
	*/
	mounted: function(){
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_MOUNTED) this.$log.info('component \'@/components/site-edit\' -> mounted');		
		this.setData()
	},
	methods: methods,
	watch: {
		item () {
			this.setData()
		}
	}
}