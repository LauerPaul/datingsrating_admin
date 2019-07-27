/**
*   @version 1.0 beta
*   @module @/components/homepage-content
*   @desc <strong>Component Home Page Content</strong>
*   @see ~/components/homepage-content
*
*   @author Pavel Lauer (front-end developer markline.agency)
*   @copyright 2018©Markline.Agency
*/

import service from '@/services/appServices'

const data = () => {
	return {
		keys: [
			{
				name: 'Секция 3',
				items: ['section_3_title', 'section_3_desc']
			},
			{
				name: 'Секция 3 - блок 1',
				items: ['section_3_b_1_title', 'section_3_b_1_text']
			},
			{
				name: 'Секция 3 - блок 2',
				items: ['section_3_b_2_title']
			},
			{
				name: 'Секция 3 - блок 3',
				items: ['section_3_b_3_title']
			},
			{
				name: 'Секция 3 - блок 4',
				items: ['section_3_b_4_title', 'section_3_b_4_text']
			},
			{
				name: 'Секция 3 - блок 5',
				items: ['section_3_b_5_title']
			},
			{
				name: 'Секция 3 - блок 6',
				items: ['section_3_b_6_title']
			},
			{
				name: 'Секция 3 - seo текст',
				items: ['section_3_seo_title', 'section_3_seo_desc', 'section_3_seo_text']
			},
		],
		inputs: null
    }
}

const methods = {
	setData () {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('component \'@/components/homepage-content\' -> method init');
		
		this.inputs = {}

		for(let item of this.content) {
			this.inputs[item.name] = item.text
		}
	},
	
	setLabel (name) {
		if(name.indexOf('title') + 1) {
			return 'Заголовок'
		}
		else if (name.indexOf('desc') + 1) {
			return 'Подзаголовок'
		}
		else if (name.indexOf('text') + 1) {
			return 'Текст'
		}
	},

	async sendForm () {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_FUNCS) this.$log.info('component \'@/components/banner-edit\' -> method init');
		let data = null
		let posts = []

		for(let item in this.inputs) {
			let element = null

			this.content.filter(el => {
				if (el.name === item) {
					element = el
					element.text = this.inputs[item]
					posts.push(element)
				}
			})
		}

		data = await service.formData(posts, false)

		this.$emit('submit_form', data, 'content')
	},
}

export default {
	name: 'seoEdit',
	data: data,
	computed: {
	},
	props: ['content'],
	/**
	* @desc ▶ Hook reporting <br>
	* <strong style="color:red; font-size: 18px;">ⓘ</strong>
	* @event module:@/components/homepage-content~COMPONENT <strong>Home Page Content</strong> mounted
	*/
	mounted: function(){
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_MOUNTED) this.$log.info('component \'@/components/homepage-content\' -> mounted');		
		this.setData()
	},
	methods: methods,
	watch: {
		seo () {
			this.setData()
		}
	}
}