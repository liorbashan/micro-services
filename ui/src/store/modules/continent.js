import { EventBus } from '@/eventBus';

export default {
    namespaced: true,
    state: {
        continents: [],
    },
    mutations: {
        SET_CONTINENTS: (state, continents) => {
            state.continents = continents;
        },
    },
    actions: {
        FETCH_CONTINENTS: async ({ commit }) => {
            let data = [];
            EventBus.$emit('SHOW_LOADER', 1);
            const result = await (await fetch(`${process.env.VUE_APP_API_BASE_URL}/continent`)).json().catch((error) => {
                console.log(error);
            });
            if (result) {
                data = result.continents;
                console.log('data', data);
                commit('SET_CONTINENTS', data);
            }
            EventBus.$emit('HIDE_LOADER', 1);
            return data;
        },
    },
    getters: {
        GET_CONTINENTS: (state) => {
            return state.continents;
        },
    },
};
