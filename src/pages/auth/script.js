/**
*   @version 1.0 beta
*   @module @/pages/auth
*   @desc <strong>Auth Page</strong>
*   @see ~/pages/auth
*
*   @author Pavel Lauer (front-end developer markline.agency)
*   @copyright 2018©Markline.Agency
*/
import { mapState } from 'vuex'
import GraphicAnimation from '@/components/animation/graphic'
import AuthForm from '@/components/authForm'

const data = () => {
	return {
	}
}

const methods = {
}

export default {
	name: 'AuthPage',
	metaInfo: {
		title: 'Авторизация',
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
	* Страница использует компоненты:
	* > [Graphic Animation]{@link /components/animation/graphic}<br>
	* > [Auth Form]{@link /components/authForm}<br>
	*/
	components: {
		'animation-bg': GraphicAnimation,
		'auth-form': AuthForm
	},

	/**
	* @desc ▶ Hook reporting <br>
	* <strong style="color:red; font-size: 18px;">ⓘ</strong>
	* @event module:@/pages/auth~PAGE <strong>Auth</strong> mounted
	*/
	mounted: function(){
		if (this.$store.state.Site.params.log && this.$store.state.Site.params.log.LOG_MOUNTED) this.$log.info('component \'@/pages/auth\' -> mounted');		
	},
	methods: methods
}