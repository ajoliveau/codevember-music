// Example : https://github.com/vuejs/vuex/blob/dev/examples/shopping-cart/store/modules/products.js

const state = {
    
}

// getters
const getters = {  
}

// actions
const actions = {
    addResource({ state, commit}, resource) {
        commit('incrementResource', resource);
    }

}

// mutations
const mutations = {
    incrementResource(state, resource) {
        state[resource].amount += state[resource].step;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}