// store.js
import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";

export default createStore({
    state: {
        searchData: null,
        userData: null
    },
    mutations: {
        setSearchData(state, data) {
            state.searchData = data;
        },
        setUserData(state, data) {
            state.userData = data;
        },
    },
    plugins: [createPersistedState({
        paths: ['userData']
    })]
});
