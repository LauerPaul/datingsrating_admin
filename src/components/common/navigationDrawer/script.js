/**
*   @version 1.0 beta
*   @module @/components/common/navigationDrawer
*   @desc <strong>Component Navigation Drawer</strong>
*   @see ~/components/common/navigationDrawer
*
*   @author Pavel Lauer (front-end developer markline.agency)
*   @copyright 2018©Markline.Agency
*/

import { mapState } from 'vuex'

const data = () => {
	return {
		items: [
			{ id: 1, icon: 'home', text: 'Главная страница', linkName: 'home' },
			{ id: 2, icon: 'alternate_email', text: 'E-mail Админов', linkName: 'email' },
			{ id: 3, icon: 'chrome_reader_mode ', text: 'Сайты', linkName: 'sites' },
		]
    }
}

const methods = {
}

export default {
	name: 'navigationDrawer',
	data: data,
	computed: {
        ...mapState('Site', ['drawer'])
	},
	/**
	* @desc ▶ Hook reporting <br>
	* <strong style="color:red; font-size: 18px;">ⓘ</strong>
	* @event module:@/components/common/navigationDrawer~COMPONENT <strong>Navigation Drawer</strong> mounted
	*/
	mounted: function(){
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_MOUNTED) this.$log.info('component \'@/components/common/navigationDrawer\' -> mounted');		
	},
	methods: methods
}