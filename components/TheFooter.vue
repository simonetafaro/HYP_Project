<template>
  <header class="footer">
    <div class="footer-content">
      <div class="left">Landmarks</div>
      <div class="rigth">
        <ul class="group-name-list">
          <li>Group Name: 4 Luppoli</li>
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
  background: black;
  color: white;
  display: flex;
  max-height: 150px;
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
.left {
  margin-right: auto;
}
.group-name-list {
  list-style: none;
  text-align: left;
}
</style>
