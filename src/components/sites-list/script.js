/**
*   @version 1.0 beta
*   @module @/components/sites-list
*   @desc <strong>Component Sites List</strong>
*   @see ~/components/sites-list
*
*   @author Pavel Lauer (front-end developer markline.agency)
*   @copyright 2018©Markline.Agency
*/

import service from '@/services/appServices'

const data = () => {
	return {
		headers: [
			{
				text: 'ID',
				align: 'left',
				sortable: true,
				value: 'id',
			},
			{ text: 'Name', sortable: true, value: 'name' },
			{ text: 'Logo', sortable: false, value: 'logo' },
			{ text: 'Rate', sortable: false, value: 'rate' },
			{ text: 'Active', value: 'active' },
			{ text: 'Action', sortable: false, align: 'right', value: 'action' },
		],
		form: null,
    }
}

const methods = {
	setData () {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('component \'@/components/sites-list\' -> method init');
		this.form = this.items
		for(let item in this.form) this.form[item].active = parseInt(this.form[item].active) ? true : false
	},

	getColor (rate) {
		if(!rate) return 'transparent'
		else if (parseInt(rate) >= 8) return 'green'
		else if (parseInt(rate) >= 5.5) return 'orange'
		else return 'red'
	},
 
	rateCalc (item) {
		if(!item) return 0
		return Math.round(((parseInt(item.er_ease_use) +
				parseInt(item.er_services_support) +
				parseInt(item.er_number_members) +
				parseInt(item.er_quality_profiles) +
				parseInt(item.er_safety_antiscam) +
				parseInt(item.er_value_money) +
				parseInt(item.er_features) +
				parseInt(item.er_functionality))/8)*10)/10
	},

	itemStatusToggle (props) {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('component \'@/components/sites-list\' -> method init');
		if(!props) return 0
		this.$emit('statusToggle', props.item)
	}
}

export default {
	name: 'sitestList',
	data: data,
	computed: {
	},
	props: ['items'],
	/**
	* @desc ▶ Hook reporting <br>
	* <strong style="color:red; font-size: 18px;">ⓘ</strong>
	* @event module:@/components/sites-list~COMPONENT <strong>Sites List</strong> mounted
	*/
	mounted: function(){
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_MOUNTED) this.$log.info('component \'@/components/sites-list\' -> mounted');		
		this.setData()
	},
	methods: methods,
	watch: {
		items () { this.setData() }
	}
}