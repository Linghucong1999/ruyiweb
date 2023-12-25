import Vue from 'vue'
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: () => import('@/pages/login'),
            meta: {
                hideHeader: true,
                trust: true,
                noNeedLogin: true,
            }
        },
        {
            path: '/Home',
            name: 'Layout',
            component: () => import('@/pages/layout'),
            redirect: { name: 'Home' },
            children: [
                {
                    path: 'home',
                    name: 'Home',
                    component: () => import('@/pages/home/index'),
                    redirect: { name: 'page-list' },
                }
            ]
        },

    ]
})