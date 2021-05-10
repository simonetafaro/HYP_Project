<template>
  <header class="header">
    <div class="header-content">
      <div class="title">
        <p
          :style="{
            color: `#000000`,
            display: 'inline',
          }"
          @click="goTo(`/`)"
        >
          HEX
        </p>
        <p
          :style="{
            color: `#4D41C9`,
            display: 'inline',
          }"
          @click="goTo(`/`)"
        >
          TECH.
        </p>
      </div>
      <nav class="right">
        <div
          v-for="(item, itemIndex) of menuOptions"
          :key="'menu-item-' + itemIndex"
          class="menu-item"
        >
          <nuxt-link class="headerContent" :to="item.path">
            {{ item.name }}
          </nuxt-link>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import GoToMixins from '~/mixins/goTo-mixins.js'

export default {
  data() {
    return {
      menuOptions: [
        {
          name: 'Home',
          path: '/',
        },
        {
          name: 'Areas',
          path: '/area',
        },
        {
          name: 'Services',
          path: '/service',
        },
        {
          name: 'Case Studies',
          path: '/casestudy',
        },
        {
          name: 'Team',
          path: '/team',
        },
        {
          name: 'About',
          path: '/about',
        },
      ],
    }
  },
  mixins: [GoToMixins],
}
</script>

<style>
.header {
  position: sticky;
  height: 70px;
  width: 100%;
  top: 0;
  background-color: white;
  display: flex;
  justify-content: space-between;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.3);
  z-index: 1;
}
.header-content {
  width: 100%;
  margin-right: 50px;
  margin-left: 50px;
  align-items: center;
  display: inline-flex;
  color: black;
}
.headerContent {
  width: 100%;
  align-items: center;
  display: inline-flex;
  color: black;
  text-decoration: none;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 19px;
  text-transform: uppercase;
}
.right {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-right: 50px;
  margin-left: auto;
  max-width: 70%;
}
.menu-item {
  margin-left: 50px;
}
.title {
  cursor: pointer;
  font-family: Poppins;
  font-style: normal;
  font-weight: 800;
  font-size: 40px;
  line-height: 60px;
}
</style>
