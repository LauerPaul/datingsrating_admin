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
		form: null,
    }
}

const methods = {
	setData () {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('component \'@/components/sites-list\' -> method init');
		
		this.form = {}

		for(let item of this.content) {
			this.inputs[item.name] = item.text
		}
	},

	async sendForm () {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('component \'@/components/banner-edit\' -> method init');
		// let data = null
		// let posts = []

		// for(let item in this.inputs) {
		// 	let element = null

		// 	this.content.filter(el => {
		// 		if (el.name === item) {
		// 			element = el
		// 			element.text = this.inputs[item]
		// 			posts.push(element)
		// 		}
		// 	})
		// }

		// data = await service.formData(posts, false)

		// this.$emit('submit_form', data, 'content')
	},
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
	}
}