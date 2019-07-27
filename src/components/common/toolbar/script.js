/**
*   @version 1.0 beta
*   @module @/components/common/toolbar
*   @desc <strong>Component Toolbar</strong>
*   @see ~/components/common/toolbar
*
*   @author Pavel Lauer (front-end developer markline.agency)
*   @copyright 2018©Markline.Agency
*/

import { mapState, mapActions } from 'vuex'

const data = () => {
	return {
        logo: require('@/assets/images/logo/icon.png'),
    }
}

const methods = {
	...mapActions('Site', ['toggleDrawer']),
	...mapActions('Auth', ['userLogout']),

}

export default {
	name: 'toolbar',
	data: data,
	computed: {
        ...mapState('Site', ['drawer'])
	},
	/**
	* @desc ▶ Hook reporting <br>
	* <strong style="color:red; font-size: 18px;">ⓘ</strong>
	* @event module:@/components/common/toolbar~COMPONENT <strong>Toolbar</strong> mounted
	*/
	mounted: function(){
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_MOUNTED) this.$log.info('component \'@/components/common/toolbar\' -> mounted');		
	},
	methods: methods
}