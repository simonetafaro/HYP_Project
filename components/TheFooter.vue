<template>
  <header class="footer">
    <div class="footer-content">
      <div class="left">
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
      <div class="rigth">
        <p class="follow">Follow us @4LUPPOLI</p>
        <p class="members">Group members</p>
        <ul class="group-name-list">
          <li>
            Andrea Manglaviti | 10610431 | andrea.manglaviti@mail.polimi.it
          </li>
          <li>
            Isabella Possaghi | 10570418 | isabella.possaghi@mail.polimi.it
          </li>
          <li>Marco Acquati | 10583134 | marco2.acquati@mail.polimi.it</li>
          <li>Simone Tafaro | 10639032 | simone.tafaro@mail.polimi.it</li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {}
</script>

<style>
.footer {
  height: auto;
  background: white;
  display: flex;
  max-height: 250px;
}
.footer-content {
  margin: 40px auto;
  max-width: 1000px;
  text-align: center;
  width: 100%;
  display: inline-flex;
}
.right {
  margin-left: auto;
}

.group-name-list {
  list-style: none;
  text-align: left;
  color: black;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 30px;
  opacity: 0.6;
}
.left {
  margin-right: auto;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 20px;
  line-height: 47px;
}
.follow {
  padding-left: 40px;

  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */
  text-align: left;

  text-transform: uppercase;
}
.members {
  padding-left: 40px;

  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  /* identical to box height */
  text-align: left;
  color: #4d41c9;
  text-transform: uppercase;
}
</style>
