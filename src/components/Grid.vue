<template>
  <div class="container">
    <div class="buttons">
      <button @click="drawPath" :disabled="!allowReset" class="btn-success">
        Start
      </button>
      <button @click="createGrid" :disabled="!allowReset" class="btn-fail">
        Reset
      </button>
      <select
        name="selected-algorithm"
        id="selected-algorithm"
        v-model="selectedAlgorithm"
      >
        <option value="dijkstra">Dijkstra</option>
        <option value="breadthFirst">Breadth First</option>
        <option value="depthFirst">Depth First</option>
      </select>
    </div>
    <div :class="{ 'grid-modal': showModal }">
      <div v-for="(col, colIdx) in grid" :key="colIdx" class="row">
        <Node
          v-for="(row, rowIdx) in col"
          :key="rowIdx"
          :node="row"
          @mouseover.native="addWall(colIdx, rowIdx)"
        ></Node>
      </div>
    </div>
    <div class="grid-control">
      <label for="wall-select">Use Walls</label>
      <input type="checkbox" id="wall-select" v-model="allowAddWall" />
    </div>
  </div>
</template>

<script>
import Node from "./Node.vue";
import { ROWS, COLS, START, END } from "@/variables";
import {
  dijkstra,
  getShortestPath,
  breadthFirst,
  depthFirst
} from "@/algorithms";
export default {
  components: {
    Node
  },
  data() {
    return {
      grid: [],
      path: [],
      showModal: false,
      allowAddWall: false,
      allowReset: true,
      selectedAlgorithm: "dijkstra"
    };
  },
  computed: {
    algorithm: function() {
      switch (this.selectedAlgorithm) {
        case "dijkstra":
          return dijkstra;
        case "breadthFirst":
          return breadthFirst;
        case "depthFirst":
          return depthFirst;
        default:
          return dijkstra;
      }
    }
  },
  created() {
    this.createGrid();
  },
  methods: {
    createGrid: function() {
      const grid = [];
      for (let col = 0; col < COLS; col++) {
        const currentRow = [];
        for (let row = 0; row < ROWS; row++) {
          currentRow.push(this.makeNode(col, row));
        }
        grid.push(currentRow);
      }
      this.grid = grid;
    },
    makeNode: function(col, row) {
      return {
        col,
        row,
        distance: Infinity,
        isVisited: false,
        previousNode: null,
        color: this.getNodeColor(col, row),
        isWall: false
      };
    },
    getNodeColor: function(col, row) {
      if (col === START.col && row == START.row) {
        return "green";
      } else if (col === END.col && row == END.row) {
        return "red";
      } else {
        return "white";
      }
    },
    setNodeColors: async function(nodes, color) {
      for (const node of nodes) {
        const { col, row } = node;
        if (col === START.col && row === START.row) {
          continue;
        }
        if (col === END.col && row === END.row) {
          continue;
        }
        await new Promise(resolve => setTimeout(resolve, 50));
        this.grid[col][row]["color"] = color;
      }
    },
    drawPath: async function() {
      this.allowAddWall = false;
      this.allowReset = false;
      this.path = this.algorithm(
        this.grid,
        this.grid[START.col][START.row],
        this.grid[END.col][END.row]
      );
      await this.setNodeColors(this.path, "pink");
      const shortestPath = getShortestPath(this.grid[END.col][END.row]);
      await this.setNodeColors(shortestPath, "blue");
      this.toggleModal();
      await new Promise(resolve => setTimeout(resolve, 3000));
      this.toggleModal();
      this.allowReset = true;
    },
    addWall: function(colIdx, rowIdx) {
      if (!this.allowAddWall) return;
      this.grid[colIdx][rowIdx]["isWall"] = true;
    },
    toggleModal: function() {
      this.showModal = !this.showModal;
    }
  }
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.buttons {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
button {
  border: none;
  margin: 1rem 0;
  width: 5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  color: white;
}
.btn-success {
  background-color: rgb(5, 163, 5);
}
.btn-success:hover {
  background-color: rgb(46, 187, 46);
}
.btn-success:disabled {
  background-color: rgb(123, 206, 123);
  cursor: not-allowed;
}
.btn-fail {
  background-color: rgb(216, 100, 100);
}
.btn-fail:hover {
  background-color: rgb(221, 148, 148);
}
.btn-fail:disabled {
  background-color: rgb(216, 162, 162);
  cursor: not-allowed;
}
@keyframes pulse {
  0% {
    opacity: 1;
  }
  20% {
    opacity: 0.6;
  }
  40% {
    opacity: 0.9;
  }
  60% {
    opacity: 0.6;
  }
  100% {
    opacity: 0;
  }
}
.row {
  display: flex;
  align-items: center;
}
.grid-modal {
  position: relative;
}
.grid-modal::after {
  position: absolute;
  content: "Hooray!";
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: grid;
  place-items: center;
  opacity: 0.8;
  font-size: 2rem;
  background-color: beige;
  transition: opacity linear;
  animation: pulse 3s;
}
</style>
