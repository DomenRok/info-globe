const state = {
    suggestedPlace: []
};

const getters = {
    suggestedPlace: state => state.suggestedPlace
};

const actions = {
    async addSuggestedPlace({commit}, place){
        commit("setSuggestedPlace", place)
    }
};

const mutations = {
    setSuggestedPlace: (state, place) => (
        state.suggestedPlace = place
    )
};

export default {
    state,
    getters,
    actions,
    mutations
}