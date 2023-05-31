// store.js
import { createStore } from 'vuex';

export default createStore({
    state: {
        searchData: null,
    },
    mutations: {
        setSearchData(state, data) {
            state.searchData = data;
        },
    },
});
