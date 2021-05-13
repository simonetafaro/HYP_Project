<template>
  <header class="footer">
    <div class="footer-content">
      <div class="left">
        HEX
        <span class="title-purple"> TECH. </span>
      </div>
      <div class="right-footer">
        <div class="intro">
          GET IN TOUCH
          <ul class="group-name-list">
            LINKS
            <li
              v-for="(item, itemIndex) of menuOptions"
              :key="'menu-item-' + itemIndex"
            >
              <nuxt-link class="links" :to="item.path">
                {{ item.name }}
              </nuxt-link>
            </li>
          </ul>
        </div>

        <div class="intro">
          CONTACT US

          <ul class="group-name-list">
            HEADQUARTERS
            <li></li>
            <li></li>
            <li>Andrea Manglaviti</li>
            <li>Isabella Possaghi</li>
            <li>Marco Acquati</li>
            <li>Simone Tafaro</li>
          </ul>
        </div>
        <div class="intro">
          CREATORS
          <ul class="group-name-list">
            GROUP MEMBERS
            <li>
              <a
                class="links"
                href="https://www.linkedin.com/in/andrea-manglaviti-968685199/"
                >Andrea Manglaviti</a
              >
            </li>
            <li>
              <a
                class="links"
                href="https://www.linkedin.com/in/isabella-possaghi/"
                >Isabella Possaghi</a
              >
            </li>
            <li>
              <a
                class="links"
                href="https://www.linkedin.com/in/marco-acquati-23bb31b8/"
                >Marco Acquati</a
              >
            </li>
            <li>
              <a
                class="links"
                href="https://www.linkedin.com/in/simone-tafaro-0b5a6bb7/"
                >Simone Tafaro</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import GoToMixins from '~/mixins/goTo-mixins.js'

export default {
  mixins: [GoToMixins],
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
}
</script>

<style>
.footer {
  height: auto;
  background: #e5e5e5;
  display: flex;
  max-height: 1000px;
  justify-content: space-between;
}
.footer-content {
  margin: auto;
  max-width: 1000px;
  text-align: center;
  width: 100%;
  display: inline-flex;
  padding-top: 50px;
}

.right {
  margin: auto;
}
.right-footer {
  display: inline-flex;
  justify-content: space-between;
  display: flex;
  width: 70%;
}

.group-name-list {
  list-style: none;
  text-align: left;
  font-family: Barlow;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 40px;
  /* identical to box height */
  color: #4d41c9;
}
.left {
  margin-right: 100px;
  cursor: pointer;
  max-height: 75px;
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 20px;
  line-height: 47px;
  color: #cdc9ff;
  display: inline-flex;
}
.links {
  text-align: left;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 30px;
  /* or 167% */
  text-decoration: none;
  color: #000000;

  mix-blend-mode: normal;
  opacity: 0.6;
}

ul.group-name-list li {
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 30px;
  /* or 167% */

  color: #000000;

  mix-blend-mode: normal;
  opacity: 0.6;
}

.intro {
  font-family: Barlow;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  /* identical to box height */
  justify-content: space-between;
}
</style>
