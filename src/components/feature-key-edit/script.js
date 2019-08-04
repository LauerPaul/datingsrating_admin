/**
*   @version 1.0 beta
*   @module @/components/feature-key-edit
*   @desc <strong>Component Features Key Edit</strong>
*   @see ~/components/feature-key-edit
*
*   @author Pavel Lauer (front-end developer markline.agency)
*   @copyright 2018©Markline.Agency
*/

import service from '@/services/appServices'

const data = () => {
	return {
		form: null,
		isNew: false,
        rulesName: [v => v.length >= 4 || 'Минимум 4 символа'],
    }
}

const methods = {
	setData () {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('component \'@/components/feature-key-edit\' -> method init');
		if (!this.item) return false
		this.form = this.item
		this.isNew = this.item.name ? false : true
	},

	saveItem () {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('component \'@/components/feature-key-edit\' -> method init');
		if (!this.form || !this.form.name) return false
		if (this.isNew) this.$emit('addNew', this.form)
		else this.$emit('updateItem', this.form)
	},

	replaceSpace () {
		if (!this.form || !this.form.key || !this.isNew) return false
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('component \'@/components/feature-key-edit\' -> method init');
		this.form.key = this.$translit(this.form.key)
	}
}

export default {
	name: 'featureKeyEdit',
	data: data,
	computed: {
		btnDisabled () {
			if (!this.form || !this.form.name) return false
			else if (this.form.name.length < 4) return false
			else return true
		}
	},
	props: ['item'],
	/**
	* @desc ▶ Hook reporting <br>
	* <strong style="color:red; font-size: 18px;">ⓘ</strong>
	* @event module:@/components/feature-key-edit~COMPONENT <strong>Features Key Edit</strong> mounted
	*/
	mounted: function(){
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_MOUNTED) this.$log.info('component \'@/components/feature-key-edit\' -> mounted');		
		this.setData()
	},
	methods: methods,
	watch: {
		item() { this.setData() }
	}
}