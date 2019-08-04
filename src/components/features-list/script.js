/**
*   @version 1.0 beta
*   @module @/components/features_list
*   @desc <strong>Component Features List</strong>
*   @see ~/components/features_list
*
*   @author Pavel Lauer (front-end developer markline.agency)
*   @copyright 2018©Markline.Agency
*/

import service from '@/services/appServices'
import featureKeyEdit from '@/components/feature-key-edit'

const data = () => {
	return {
		headers: [
			{
				text: 'ID',
				align: 'left',
				sortable: true,
				value: 'id',
			},
			{ text: 'Text', sortable: true, value: 'name' },
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
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('component \'@/components/features_list\' -> method init');
		if (!this.items) {
			this.$emit('loadData')
			return false
		}
		this.form = this.items
		for(let item in this.form) this.form[item].active = parseInt(this.form[item].active) ? true : false
	},

	itemStatusToggle (props) {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('component \'@/components/features_list\' -> method init');
		if(!props) return 0
		this.$emit('statusToggle', props.item)
	},

	removeItem () {
		if(!this.selectItemID) return false
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('component \'@/components/features_list\' -> method init');
		this.$emit('removeItem', this.selectItemID)
		this.selectItemID = null
		this.dialogRemove = false
	},

	setSelectItem (item) {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('component \'@/components/features_list\' -> method init');
		let _item = item ? item : {
			name: '',
			active: ''
		}

		this.selectItem = _item
		this.dialog = true
	},

	addNewItem (item) {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('component \'@/components/features_list\' -> method init');
		if (!item) return false
		else this.$emit('addNewItem', item) 
	},

	updateItem (item) {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('component \'@/components/features_list\' -> method init');
		if (!item) return false
		else this.$emit('updateItem', item) 
	},

	dialogClose () {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('component \'@/components/features_list\' -> method init');
		
		this.dialog = false
		this.selectItem = null
	}
}

export default {
	name: 'featuresList',
	data: data,
	computed: {
	},
	props: ['items'],
	/**
	* @desc ▶ Hook reporting <br>
	* <strong style="color:red; font-size: 18px;">ⓘ</strong>
	* @event module:@/components/features_list~COMPONENT <strong>Features List</strong> mounted
	*/
	mounted: function(){
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_MOUNTED) this.$log.info('component \'@/components/features_list\' -> mounted');		
		this.setData()
	},
	created () {
		this.$root.$on('addNewFeaturesKey', this.setSelectItem);
		this.$root.$on('editFeaturesWindowClose', this.dialogClose);
	},
	methods: methods,
	components: {
		featureKeyEdit
	},
	watch: {
		items () { this.setData() }
	}
}