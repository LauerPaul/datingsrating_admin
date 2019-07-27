/**
* 	@vuedoc
*	@module layouts/default
* 	@see @/layouts/default
*
* 	@version 1.0
* 	@desc Основной шаблон
*
*   @author Pavel Lauer (front-end developer markline.agency)
*   @copyright 2018©Markline.Agency
*/
import { mapState } from 'vuex'
import navigationDrawer from '@/components/common/navigationDrawer'
import toolbar from '@/components/common/toolbar'

export default {
	data() {
		return {
			/**
			* @typedef {Object} Data
			*/
		}
	},
	computed: {
		...mapState('Auth', ['isAuth']),
		// @property {boolean} locationClass - Класс с именем роута
		locationClass (){
			return this.$route.name
		}
	},

	/**
	*	This layout use components:
	*		> [Navigation Drawer]{@link module:components/common/navigationDrawer}
	*/
	components: {
		'navigation-drawer' : navigationDrawer,
		toolbar
	},

	/**
	* @desc ▶ Hook reporting
	* @event module:layouts/default~Layout <strong>Default</strong> created
	*/
	created () {
        this.$Progress.start()
     
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LAYOUT_LOG) this.$log.info('Layout \'Default\' (@/layouts/default) - created hook init');
	},

	/**
	* @desc ▶ Hook reporting
	* @event module:layouts/default~Layout <strong>Default</strong> mounted
	*/
	mounted: function(){
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LAYOUT_LOG) this.$log.info('Layout \'Default\' (@/layouts/default) - mounted hook init');
        
        this.$Progress.finish()
	},

	/**
	* @desc ▶ Hook reporting
	* @event module:layouts/default~Layout <strong>Default</strong> beforeUpdate
	*/
	beforeUpdate() {
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LAYOUT_LOG) this.$log.info('Layout \'Default\' (@/layouts/default) - beforeUpdate hook init');
        
        this.$Progress.start()
	},

	/**
	* @desc ▶ Hook reporting
	* @event module:layouts/default~Layout <strong>Default</strong> updated
	*/
	updated(){
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LAYOUT_LOG) this.$log.info('Layout \'Default\' (@/layouts/default) - updated hook init');
        
        this.$Progress.finish()
	},

	/**
	* This layout watch:
	* 	> $route
	* 	> $store.state.Auth.auth
	*/
	watch: {
      	'$store.state.Auth.isAuth': function (v) {
      		if(this.isAuth) this.$router.push({name: 'home'});
      		else this.$router.push({name: 'login'});
      	},
    }
}

