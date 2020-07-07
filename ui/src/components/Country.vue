<template>
    <div>
        <router-link :to="{ name: 'Continent' }">Back</router-link>
        <h1>Countries List</h1>
        <v-container fluid class="d-flex justify-content flex-wrap">
            <v-card
                v-for="item in countryList"
                :key="item.code"
                class="ma-3"
                width="344"
                outlined
            >
                <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-4">{{item.code}}</div>
                        <v-list-item-title class="headline mb-1">{{item.name}}</v-list-item-title>
                        <v-list-item-subtitle>
                            <ul>
                                <li>Phone: {{item.phone}}</li>
                                <li>Capital: {{item.capital}}</li>
                                <li>Currency: {{item.currency}}</li>
                                <li>Languages:
                                    <ol>
                                        <li v-for="(lang, index) in item.languages" :key="index">{{lang.name}}</li>
                                    </ol>
                                </li>
                            </ul>
                        </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-avatar tile size="64">
                        <img :src="getFlagUrl(item.code)" />
                    </v-list-item-avatar>
                </v-list-item>
            </v-card>
        </v-container>
    </div>
</template>

<script>
import store from '../store';

export default {
    name: 'Country',
    props: ['code'],
    data() {
        return {};
    },
    async created() {
        this.$store.dispatch('countries/FETCH_COUNTRIES', this.code);
    },
    computed: {
        countryList() {
            return store.getters['countries/GET_COUNTRIES'];
        },
    },
    methods: {
        getFlagUrl(code) {
            return `https://www.countryflags.io/${code}/shiny/64.png`;
        },
    },
};
</script>

<style scoped>
h1 {
    color: black;
}
.v-list-item__subtitle{
    height: 120px;
}
</style>