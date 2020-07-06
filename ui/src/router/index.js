import Vue from 'vue';
import VueRouter from 'vue-router';
import Continent from '../components/Continent';
import Country from '../components/Country';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Continent',
        components: {
            default: Continent,
        },
    },
    {
        path: '/country',
        name: 'Country',
        component: Country,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
