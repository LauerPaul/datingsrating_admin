/**
*   @vuedoc
*   @module store
*   @see @/store
*
*   @version 1.0
*   @desc Хранилище данных
*
*   @author Pavel Lauer (front-end developer markline.agency)
*   @copyright 2018©Markline.Agency
*/
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import createMutationsSharer from 'vuex-shared-mutations'

import Site from '@/store/site'
import Auth from '@/store/auth'

Vue.use(Vuex)

const store = new Vuex.Store({
    plugins: [ 
    	createPersistedState({ storage: window.sessionStorage }),
    	createMutationsSharer({ predicate: (mutation, state) => {
	   		const predicate = [
	   		]
		    return predicate.indexOf(mutation.type) >= 0;
		}})
    ],
    modules: {
    	/**
    	* Store incudes:
    	* - [Store site]{@link module:store/site}
    	* - [Store auth]{@link module:store/auth}
    	*/
    	Site: Site,
        Auth: Auth,
    },
})

export default store