/**
*   @version 1.0 beta
*   @module @/pages/404
*   @desc <strong>404 Page</strong>
*   @see ~/pages/404
*
*   @author Pavel Lauer (front-end developer markline.agency)
*   @copyright 2018©Markline.Agency
*/
// import { mapState } from 'vuex'

const data = () => {
	return {
		/**
		* @typedef {Object} Data
		*/
	}
}

const methods = {
}

export default {
	name: 'NotFoundPage',
	metaInfo: {
		title: '404',
		titleTemplate: '%s - Dating Sites Expert Admin Panel',
		htmlAttrs: {
			lang: 'en',
			amp: undefined
		}
	},
	data: data,
	computed: {
	},
	/**
	* This page requires the components:<br>
	*/
	components: {
	},
	/**
	* @desc ▶ Hook reporting <br>
	* <strong style="color:red; font-size: 18px;">ⓘ</strong>
	* @event module:@/pages/404~PAGE <strong>404</strong> mounted
	*/
	mounted: function(){
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_MOUNTED) this.$log.info('component \'@/pages/404\' -> mounted');		
	},
	methods: methods
}