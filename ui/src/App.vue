<template>
    <v-app id="inspire">
        <!-- HEADER START -->
        <v-app-bar color="deep-purple accent-4" dense dark>
            <v-toolbar-title>World Countries</v-toolbar-title>
        </v-app-bar>
        <!-- HEADER END -->
        <v-main>
            <v-container class="pa-0 white align-start" fill-height fluid>
                <router-view />
            </v-container>
        </v-main>
        <!-- FOOTER START -->
        <v-footer>
            <span>&copy; 2020</span>
        </v-footer>
        <!-- FOOTER END -->
        <!-- Globals: -->
        <v-dialog v-model="error.show" persistent width="500">
            <v-card>
                <v-card-title class="headline red lighten-2" primary-title>Error!</v-card-title>
                <v-card-text class="my-8">
                    <h3>{{error.message}}</h3>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="secondary" depressed @click="error.show=false">Ok</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="success.show" persistent width="500">
            <v-card>
                <v-card-title class="headline green lighten-2" primary-title>Success!</v-card-title>
                <v-card-text class="my-8">
                    <h3>{{success.message}}</h3>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="secondary" depressed @click="success.show=false">Ok</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-overlay z-index="9999" :value="loader.show">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
        <v-snackbar
            :color="snackbar.color"
            top
            right
            :timeout="snackbar.timeout"
            v-model="snackbar.show"
        >
            {{ snackbar.message }}
            <v-btn text @click="snackbar.show = false">Close</v-btn>
        </v-snackbar>
    </v-app>
</template>
<script>
import { EventBus } from './eventBus';
// import Continent from './components/Continent'
export default {
    name: 'App',
    
    data() {
        return {
            error: {
                show: false,
                message: '',
            },
            success: {
                show: false,
                message: '',
            },
            loader: {
                counter: 0,
                show: false,
            },
            snackbar: {
                show: false,
                message: 'snackbar',
                color: 'red darken-1',
                timeout: 7000,
            },
        };
    },
    beforeMount() {
        this.$router.onReady(() => {
            this.initData();
        });
    },
    created() {
        this.$vuetify.theme.dark = true;
        this.initEventHandlers();
    },
    methods: {
        async initData() {
            await this.$store.dispatch('continent/FETCH_CONTINENTS');
        },
        initEventHandlers: function() {
            EventBus.$on('SHOW_ERROR', (payload) => {
                this.snackbar.message = payload;
                this.snackbar.color = 'error';
                this.snackbar.show = true;
            });
            EventBus.$on('SHOW_SUCCESS', (payload) => {
                this.snackbar.message = payload;
                this.snackbar.color = 'success';
                this.snackbar.show = true;
            });
            EventBus.$on('SHOW_LOADER', (payload) => {
                if (payload) {
                    this.loader.counter += payload;
                }
                this.loader.show = true;
            });
            EventBus.$on('HIDE_LOADER', (payload) => {
                if (payload) {
                    this.loader.counter -= payload;
                    if (this.loader.counter < 1) {
                        this.loader.counter = 0;
                        this.loader.show = false;
                    }
                } else {
                    this.loader.counter = 0;
                    this.loader.show = false;
                }
            });
        },
    },
};
</script>
<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
