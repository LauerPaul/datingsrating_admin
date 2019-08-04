/**
*   @version 1.0 beta
*   @module @/components/site-edit-features
*   @desc <strong>Component Site Edit Features</strong>
*   @see ~/components/site-edit-features
*
*   @author Pavel Lauer (front-end developer markline.agency)
*   @copyright 2018©Markline.Agency
*/
const data = () => {
	return {
		form: null
    }
}

const methods = {
	setData () {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('component \'@/components/site-edit-features\' -> method init');
		this.form = {}
		this.items.filter(item => { this.form[item['features_key_id']] = parseInt(item['value']) });
	},

	submitForm () {
		let data = this.items
		data.filter(item => {
			let status = this.form[item['features_key_id']] 
			item['value'] = status === true || status === 1 || status === '1' ? 1 : 0
		})
		this.$emit('sendData', 'features', {features: data}, false)
	}
}

export default {
	name: 'siteEditFeatures',
	data: data,
	computed: {
	},
	props: ['items', 'keys'],
	/**
	* @desc ▶ Hook reporting <br>
	* <strong style="color:red; font-size: 18px;">ⓘ</strong>
	* @event module:@/components/site-edit-features~COMPONENT <strong>Site Edit Features</strong> mounted
	*/
	mounted: function(){
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_MOUNTED) this.$log.info('component \'@/components/site-edit-features\' -> mounted');		
		this.setData()
	},
	created () {
		this.$root.$on('siteEditSend', this.submitForm);
		this.$emit('componentReady', 'features')
	},
	methods: methods,
	watch: {
		items () {
			this.setData()
		}
	}
}