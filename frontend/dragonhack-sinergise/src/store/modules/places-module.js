const state = {
    suggestedPlace: {},
    latLng: [0 ,0]
};

const getters = {
    suggestedPlace: state => { return state.suggestedPlace },
    latLng: state => {return state.latLng }
};

const actions = {
    async addSuggestedPlace({commit}, place){
        commit("setSuggestedPlace", place)
    }
};

const mutations = {
    setSuggestedPlace: (state, place) => (
        state.suggestedPlace = place,
        state.latLng = [place.latlng.lat, place.latlng.lng]
    )
};

export default {
    state,
    getters,
    actions,
    mutations
}