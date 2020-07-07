import { EventBus } from '@/eventBus';

export default {
    namespaced: true,
    state: {
        countries: [],
    },
    mutations: {
        SET_COUNTRIES: (state, data) => {
            state.countries = data;
        },
    },
    actions: {
        FETCH_COUNTRIES: async ({ commit }, continentCode) => {
            let data = [];
            EventBus.$emit('SHOW_LOADER', 1);
            const result = await (await fetch(`${process.env.VUE_APP_API_BASE_URL}/country/${continentCode}`)).json().catch((error) => {
                console.log(error);
            });
            if (result) {
                data = result.countries;
                commit('SET_COUNTRIES', data);
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
