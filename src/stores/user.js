// user
import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate'

export default createStore({
    state: {
        userData: null
    },
    mutations: {
        setUserData(state, data) {
            state.userData = data;
        },
    },
    plugins: [createPersistedState({
        paths: ['userData']
    })]
})

