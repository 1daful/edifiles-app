import { createRouter, createWebHistory } from 'vue-router';
const routes = [
    {
        path: '/',
        component: () => import('../layouts/Mainlayout.vue'),
        name: "MainLayout"
    },
    {
        path: '/access_token=:url',
        component: () => import('../pages/Verification.vue'),
    },
    {
        props: (route) => ({ myUrl: route.params.myUrl }),
        path: '/error=:myUrl',
        component: () => import('../pages/Error.vue'),
    },
    {
        path: '/:catchAll(.*)*',
        component: () => import('../pages/ErrorNotFound.vue'),
    },
    {
        path: '/',
        name: 'Home',
        component: () => import('../pages/Page.vue'),
        meta: {
            menu: true
        }
    },
    {
        path: '/verification',
        name: 'Verification',
        component: () => import('../pages/Verification.vue'),
        props: true
    },
    {
        path: '/search',
        name: 'Search',
        component: () => import('../pages/SERP.vue'),
        children: [
            {
                path: ':categories',
                name: 'SERPView',
                component: () => import('../pages/SERPView.vue'),
                props: true
            },
        ],
    },
    {
        path: '/reset/:param',
        name: 'Reset',
        component: () => import('../pages/Reset.vue'),
        props: true
    },
    {
        path: '/signin',
        name: 'SignIn',
        component: import('../pages/SignIn.vue'),
        props: (route) => ({ myUrl: route.query.myUrl }),
        meta: {
            noHeader: true
        }
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: () => import('../pages/SignUp.vue'),
        props: (route) => ({ myUrl: route.query.myUrl }),
        meta: {
            noHeader: true
        }
    }
];
export const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createWebHistory()
});
