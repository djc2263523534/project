const state = {

    user: 'admin',
    password: '123456',
    name: '映射'

}

const getters = {


}


const mutations = {
    GET_INFO(state, message) {
        console.log(message);
    }

}


const actions = {

}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}