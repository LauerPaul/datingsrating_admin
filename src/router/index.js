import Vue from 'vue';
import VueRouter from 'vue-router'
import routes from '@/router/routes'
import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
	routes: routes,
	linkActiveClass: 'activeLink',
    linkExactActiveClass: 'globalActiveLink'
})

router.beforeEach((to, from, next) => {
	const requiresAuth = to.matched.some(record => record.meta.isAuth);
	if(requiresAuth && !store.state.Auth.isAuth) {
		next('/login');
	} else {
		next();
	}
});

export default router