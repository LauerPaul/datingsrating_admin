/**
*   @version 1.0 beta
*   @module @/components/reviews-list
*   @desc <strong>Component Reviews List</strong>
*   @see ~/components/reviews-list
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
			{ text: 'Date', sortable: false, value: 'date' },
			{ text: 'Rate', value: 'rate_count', sortable: false},
			{ text: 'Active', value: 'active' },
			{ text: 'Action', sortable: false, align: 'right', value: 'action' },
		],
		form: null,
		dialog: false,
		dialogRemove: false,
		selectItem: null,
		selectItemID: null
    }
}

const methods = {
	setData () {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('component \'@/components/reviews-list\' -> method init');
		if (!this.items) {
			this.$emit('loadData')
			return false
		}
		this.form = this.items
		for(let item in this.form) this.form[item].active = parseInt(this.form[item].active) ? true : false
	},

	itemStatusToggle (props) {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('component \'@/components/reviews-list\' -> method init');
		if(!props) return 0
		this.$emit('statusToggle', props.item)
	},

	removeItem () {
		if(!this.selectItemID) return false
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('component \'@/components/reviews-list\' -> method init');
		this.$emit('removeItem', this.selectItemID)
		this.selectItemID = null
		this.dialogRemove = false
	},

	dialogClose () {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('component \'@/components/reviews-list\' -> method init');
		this.dialog = false
		this.selectItem = null
	}
}

export default {
	name: 'ReviewsList',
	data: data,
	computed: {
	},
	props: ['items'],
	/**
	* @desc ▶ Hook reporting <br>
	* <strong style="color:red; font-size: 18px;">ⓘ</strong>
	* @event module:@/components/reviews-list~COMPONENT <strong>Reviews List</strong> mounted
	*/
	mounted: function(){
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_MOUNTED) this.$log.info('component \'@/components/reviews-list\' -> mounted');		
		this.setData()
	},
	created () {
	},
	methods: methods,
	components: {
	},
	watch: {
	}
}