<template>
  <div class="node" :style="`--col:${col}; --row:${row}; --clr:${color}`"></div>
</template>

<script>
export default {
  name: "Node",
  props: {
    node: Object
  },
  computed: {
    col: function() {
      return this.node.col;
    },
    row: function() {
      return this.node.row;
    },
    color: function() {
      return this.node.isWall ? "grey" : this.node.color;
    }
  }
};
</script>

<style>
.node {
  position: relative;
  display: inline-block;
  border: 1px solid rgb(209, 197, 197);
  padding: 0.3em;
  margin: 0.05em;
  height: 0.5rem;
  width: 0.5rem;
  background-color: var(--clr);
  transition: transform 100ms ease-in-out;
}
.node:hover {
  transform: scale(1.2);
}
.node:hover::after {
  position: absolute;
  counter-reset: col var(--col) row var(--row);
  content: "[" counter(row) "," counter(col) "]";
  display: grid;
  place-items: center;
  top: -3rem;
  right: -3rem;
  height: 3rem;
  width: 3rem;
  background-color: rgb(194, 255, 159);
}
</style>
