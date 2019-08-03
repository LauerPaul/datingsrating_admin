/**
*   @version 1.0 beta
*   @module @/components/site-edit-rate
*   @desc <strong>Component Site Edit Rate</strong>
*   @see ~/components/site-edit-rate
*
*   @author Pavel Lauer (front-end developer markline.agency)
*   @copyright 2018©Markline.Agency
*/
const data = () => {
	return {
		rating: null,
		rateText: null,
		max: 10,
		min: 1,
		labels: {
			er_ease_use: "Ease of Use",
			er_services_support: "Services & Support",
			er_number_members: "Number of Members",
			er_quality_profiles: "EQuality of Profiles",
			er_safety_antiscam: "Safety & Anti-Scam",
			er_value_money: "Value for Money",
			er_features: "Features",
			er_functionality: "Functionality",
		}
    }
}

const methods = {
	setData () {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('component \'@/components/site-edit-rate\' -> method init');
		this.rating = this.rate
		this.rateText = this.text
	},

	submitForm () {
		let data = {
			rate: {},
			rate_text: {}
		}
		Object.assign(data.rate, this.rating)
		Object.assign(data.rate_text, this.rateText)

		this.$emit('sendData', 'rate', data)
	}
}

export default {
	name: 'siteEditRate',
	data: data,
	computed: {
	},
	props: ['rate', 'text'],
	/**
	* @desc ▶ Hook reporting <br>
	* <strong style="color:red; font-size: 18px;">ⓘ</strong>
	* @event module:@/components/site-edit-rate~COMPONENT <strong>Site Edit</strong> mounted
	*/
	mounted: function(){
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_MOUNTED) this.$log.info('component \'@/components/site-edit-rate\' -> mounted');		
		this.setData()
	},
	created () {
		this.$root.$on('siteEditSend', this.submitForm);
		this.$emit('componentReady', 'rate')
	},
	methods: methods,
	watch: {
		item () {
			this.setData()
		},
		rating: {
			handler(val){
				if (!this.rating) return false
				this.$emit('rateUpdate', this.rating)
			},
			deep: true
		}
	}
}