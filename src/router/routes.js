import Vue from 'vue'
import Meta from 'vue-meta'
import store from '@/store'

Vue.use(Meta)
// ------------------------------------------------

import auth from '@/pages/auth'
import notFound from '@/pages/404'
import home from '@/pages/home'
import email from '@/pages/email'
import sites from '@/pages/sites'

const routes = [
	{	
		/*home page*/
		path: "/",
		name: 'home',
		component: home,
        meta: {
            isAuth: true,
        },
	},
	{	
		/*auth page*/
		path: "/login",
		name: 'login',
		component: auth,
        meta: {
            isAuth: false
        },
	},
	{	
		/*home page*/
		path: "/email",
		name: 'email',
		component: email,
        meta: {
            isAuth: true,
        },
	},
	{	
		/*home page*/
		path: "/sites",
		name: 'sites',
		component: sites,
        meta: {
            isAuth: true,
        },
	},
	/* Web-серверные ошибки и сообщения */
	{
		/* 404 - Page not found */
		path: '/404',
		name: 'notfound',
		component: notFound
	}, {
		path: '*',
		redirect: '/404'
	}
]

export default routes