import vue from 'vue'

export const state = () => {
  return {
    menuList: [],
  }
}

export const mutations = {
  setMenuList(state, menuList) {
    vue.set(state, 'menuList', menuList)
  },
}

export const actions = {
  async nuxtServerInit({ commit }) {
    const { data } = await this.$axios.get(`${process.env.BASE_URL}/api/areas`)
    commit('setMenuList', data)
  },
}
