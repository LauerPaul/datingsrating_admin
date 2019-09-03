/**
*   @version 1.0 beta
*   @module @/components/review-edit-primary
*   @desc <strong>Component Review Edit Primary</strong>
*   @see ~/components/review-edit-primary
*
*   @author Pavel Lauer (front-end developer markline.agency)
*   @copyright 2018©Markline.Agency
*/
const data = () => {
	return {
		form: null,
		active: false,
		menuDate: false
    }
}

const methods = {
	setData () {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('component \'@/components/review-edit-primary\' -> method init');
		this.form = this.item
		this.active = parseInt(this.form.active) ? true : false
	},

	submitForm () {
		this.$emit('sendData', 'primary', this.form, false)
	},

	formatDate (date) {
		if (!date) return null
		const [year, month, day] = date.split('-')
		return `${month}/${day}/${year}`
	},

	parseDate (date) {
		if (!date) return null
		const [month, day, year] = date.split('/')
		return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
	},
}

export default {
	name: 'reviewEditPrimary',
	data: data,
	computed: {
		DateFormatted () {
			if (!this.form || !this.form.date) return false
			return this.formatDate(this.form.date)
		},
	},
	props: ['item'],
	/**
	* @desc ▶ Hook reporting <br>
	* <strong style="color:red; font-size: 18px;">ⓘ</strong>
	* @event module:@/components/review-edit-primary~COMPONENT <strong>Review Edit</strong> mounted
	*/
	mounted: function(){
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_MOUNTED) this.$log.info('component \'@/components/review-edit-primary\' -> mounted');		
		this.setData()
	},
	created () {
		this.$root.$on('reviewEditSend', this.submitForm);
		this.$emit('componentReady', 'primary')
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