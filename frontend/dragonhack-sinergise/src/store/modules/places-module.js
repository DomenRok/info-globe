const state = {
    suggestedPlace: {},
    latLng: [0 ,0],
    geoPolygon: {}
};

const getters = {
    geoPolygon: state => { return state.geoPolygon },
    suggestedPlace: state => { return state.suggestedPlace },
    latLng: state => {return state.latLng }
};

const actions = {
    async addSuggestedPlace({commit}, place){
        commit("setSuggestedPlace", place)
    },
    async addGeoPolygon({commit}, geoPoly) {
        commit("setGeoPolygon", geoPoly)
    }
};

const mutations = {
    setSuggestedPlace: (state, place) => (
        state.suggestedPlace = place,
        state.latLng = [place.latlng.lat, place.latlng.lng]
    ),
    setGeoPolygon: (state, geoPoly) => {
        state.geoPolygon = geoPoly
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}