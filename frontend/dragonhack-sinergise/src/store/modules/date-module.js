const state = {
    date: [],
};

const getters = {
    getDate: state => { return state.date },
};

const actions = {
    async addDate({commit}, date){
        let dateArray = []

        date.forEach(element => {
            let d = new Date(element)
            const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
            const mo = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(d);
            const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
            dateArray.push(`${ye}-${mo}-${da}`)
        });
        commit("setDate", dateArray)
    }
};

const mutations = {
    setDate: (state, date) => (
        state.date = date
    )
};

export default {
    state,
    getters,
    actions,
    mutations
}