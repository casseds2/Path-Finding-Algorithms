<template>
  <div id="app">
    <header>
      <p>Some Brand Here</p>
      <ul>
        <li><span>Pathfinders</span></li>
        <li><span>Sorting</span></li>
      </ul>
    </header>
    <main>
      <router-view />
    </main>
    <footer>
      Some copyright shite...
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 10em 1fr 10em;
  grid-template-areas:
    "header"
    "main"
    "footer";
  place-items: center;
}
header {
  grid-area: header;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid black;
}
header > ul {
  display: flex;
  list-style: none;
  justify-content: space-between;
}
header > ul > li {
  position: relative;
}
header > ul > li:last-child {
  padding: 0 0 0 5rem;
  margin: 0 0 0 1rem;
}
header > ul > li > span {
  display: inline-block;
  padding: 1rem 1rem;
}
header > ul > li > span::after {
  position: absolute;
  content: "";
  opacity: 0.4;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 80% 76%, 61% 100%, 0 100%);
  background: gray;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
main {
  grid-area: main;
}
footer {
  grid-area: footer;
}

@media screen and (min-width: 760px) {
  #app {
    grid-template-columns: 10em 1fr 10em;
    grid-template-areas:
      ".. header .."
      "..  main  .."
      ".. footer ..";
  }
}
</style>
