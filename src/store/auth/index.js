/**
*   @vuedoc
*   @module store/auth
*   @see @/store/auth
*
*   @version 1.0
*   @desc Хранилище данных - основные данные приложенния
*
*   @author Pavel Lauer (front-end developer markline.agency)
*   @copyright 2018©Markline.Agency
*/

const Site = {
    namespaced: true,
    state: {
        /**
        * @typedef {Object} State
        *   @property {boolean} logo - Логотип сайта
        */
        isAuth: false,
        user: null
    },
    mutations: {
        SET_AUTH_USER (state, isAuth) {
            if (isAuth) {
                state.isAuth = true
            }
        },
        SET_USER_DATA (state, data) {
            if (data) {
                state.data = data
            }
        },
        LOGOUT_USER (state, logout) {
            if (logout) {
                state.isAuth = false
                state.user = null
            }
        } 
    },
    actions: {
        /**
        *   @desc Назначение данных пользователя
        *   @method getLogParams
        **/
        setUser ({ commit }, data) {
            if (data) {
                commit('SET_AUTH_USER', true)
                commit('SET_USER_DATA',data)
            }
        },
        /**
        *   @desc Вылогирование пользователя
        *   @method userLogout
        **/
        userLogout ({ commit }) {
            commit('LOGOUT_USER', true)
        }
    }
}

export default Site