<template>
  <header class="header">
    <div class="header-content">
      <div class="title">
        HEX
        <span class="title-purple"> TECH. </span>
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
      <div>
        <button class="contact-button">CONTACT US</button>
      </div>
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
          name: 'About Us',
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
  box-shadow: 0 0 8px 0 #dedede;
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
  max-width: 54%;
}
.menu-item {
  margin-left: 50px;
}
.title {
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 40px;
  line-height: 60px;
  display: inline-flex;
  color: black;
}
.title-purple {
  color: #4d41c9;
}

.contact-button {
  font-family: Barlow;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  text-transform: uppercase;
  padding: 15px 25px 15px 25px;
  color: var(--cc-base2);
  background: #e8e6ff;
  border-radius: 35px;
  border: none;
}
</style>
