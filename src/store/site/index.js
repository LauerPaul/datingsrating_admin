/**
*   @vuedoc
*   @module store/site
*   @see @/store/site
*
*   @version 1.0
*   @desc Хранилище данных - основные данные приложенния
*
*   @author Pavel Lauer (front-end developer markline.agency)
*   @copyright 2018©Markline.Agency
*/

import services from '@/services/appServices'

const Site = {
    namespaced: true,
    state: {
        /**
        * @typedef {Object} State
        *   @property {boolean} drawer - Статус боковой панели
        */
        drawer: null,
        params: {
            log: {
                'LAYOUT_LOG': true,
                'LOG_MOUNTED': true,
                'PAGE_LOG_MOUNTED': true,
                'LOG_FUNCS': true
            }
        },
    },
    mutations: {
        TOGGLE_DRAWER (state) {
            state.drawer = !state.drawer
        },
    }, 
    actions: {
        /**
        *   @desc Переключение статуса боковой панели
        *   @method toggleDrawer
        **/
        toggleDrawer ({ commit }) {
            commit('TOGGLE_DRAWER')
        },
    }
}

export default Site