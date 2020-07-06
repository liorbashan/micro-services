import { EventBus } from '@/eventBus';

export default {
    namespaced: true,
    state: {
        countries: [],
    },
    mutations: {
        SET_COUNTRIES: (state, countries) => {
            state.countries = countries;
        },
    },
    actions: {
        FETCH_COUNTRIES: async ({ commit }, continentCode) => {
            let data = [];
            EventBus.$emit('SHOW_LOADER', 1);
            const result = await fetch(`${process.env.API_BASE_URL}/country/${continentCode}`).catch((error) => {
                console.log(error);
            });
            if (result) {
                data = result;
                commit('SET_COUNTRIES');
            }
            EventBus.$emit('HIDE_LOADER', 1);
            return data;
        },
    },
    getters: {
        GET_COUNTRIES: (state) => {
            return state.countries;
        },
    },
};
