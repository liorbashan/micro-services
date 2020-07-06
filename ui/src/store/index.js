import Vue from 'vue';
import Vuex from 'vuex';
import continent from './modules/continent';
import country from './modules/country';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        continent,
        country,
    },
});
