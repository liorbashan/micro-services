<template>
    <div>
        <h1>Countinent List</h1>
        <v-data-table
            dense
            hide-default-footer
            :headers="headers"
            :items="continents"
            class="elevation-2"
            @click:row="goToCountry"
        ></v-data-table>
    </div>
</template>

<script>
import store from '../store';
export default {
    name: 'Continent',
    data() {
        return {
            headers: [
                {
                    text: 'Name',
                    align: 'start',
                    value: 'name',
                    width: 250,
                },
                { text: 'Code', value: 'code', width: 250 },
            ],
        };
    },
    computed: {
        continents() {
            return store.getters['continent/GET_CONTINENTS'];
        },
    },
    methods:{
        goToCountry(val){
            const code=val.code;
            console.log(code);
        }
    }
};
</script>

<style lang="scss" scoped>
h1 {
    color: black;
}
</style>