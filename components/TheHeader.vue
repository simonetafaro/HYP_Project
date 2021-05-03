<template>
  <header class="header">
    <div class="header-content">
      <div class="title"><h3>Company Name</h3></div>
      <nav class="right">
        <div
          v-for="(item, itemIndex) of menuOptions"
          :key="'menu-item-' + itemIndex"
          class="menu-item"
        >
          <nuxt-link :to="item.path">
            {{ item.name }}
          </nuxt-link>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
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
          name: 'About',
          path: '/about',
        },
      ],
    }
  },
}
</script>

<style>
.header {
  height: 70px;
  background: black;
  color: white;
  display: flex;
  justify-content: space-between;
  text-align: center;
}
.header-content {
  width: 100%;
  margin-right: 50px;
  margin-left: 50px;
  align-items: center;
  display: inline-flex;
}
.right {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-right: 50px;
  margin-left: auto;
  max-width: 50%;
}
.menu-item {
  margin-left: 50px;
}
.title {
  font-size: 1.3rem;
  margin-bottom: 5px;
}
</style>
