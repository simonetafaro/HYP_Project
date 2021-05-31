import vue from 'vue'

export const state = () => {
  return {
    menuList: [],
    messages: [],
  }
}

export const mutations = {
  setMenuList(state, menuList) {
    vue.set(state, 'menuList', menuList)
  },
  addMessage(state, message) {
    const messages = state.messages
    messages.push(message)
    vue.set(state, 'messages', messages)
  },
}

export const actions = {
  async nuxtServerInit({ commit }) {
    const { data } = await this.$axios.get(`${process.env.BASE_URL}/api/areas`)
    commit('setMenuList', data)
  },
}
