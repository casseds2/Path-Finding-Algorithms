import { flattenGrid, isValidInput } from "./common";

export const depthFirst = (grid, start, end) => {
  
  if (!isValidInput) return;

  const visitedNodes = [];
  const unvisitedNodes = flattenGrid(grid);
  start["distance"] = 0;

  while (!!unvisitedNodes) {
    unvisitedNodes.sort((n1, n2) => n1["distance"] - n2["distance"]);
    const nextNode = unvisitedNodes.shift();
    if (nextNode["distance"] === Infinity) return visitedNodes;
    nextNode["isVisited"] = true;
    visitedNodes.push(nextNode);
    if (nextNode === end) return visitedNodes;
    updateNeighbour(grid, nextNode);
  }
};

const updateNeighbour = (grid, node) => {
  let neighbour = getNeighbour(grid, node);
  if (neighbour) {
    neighbour["distance"] = node["distance"] + 1;
    neighbour["previousNode"] = node;
  } else {
    neighbour = getNextAvailableNode(grid, node);
    if (neighbour) {
      neighbour["distance"] = node["distance"] + 1;
    }
  }
};

const getNeighbour = (grid, { col, row }) => {
  const neighbours = [];
  if (col > 0) neighbours.push(grid[col - 1][row]);
  if (row < grid[col].length - 1) neighbours.push(grid[col][row + 1]);
  if (col < grid.length - 1) neighbours.push(grid[col + 1][row]);
  if (row > 0) neighbours.push(grid[col][row - 1]);
  return neighbours
    .filter(node => {
      if (node.isVisited) return false;
      if (node.isWall) return false;
      return true;
    })
    .shift();
};

const getNextAvailableNode = (grid, node) => {
  const previousNode = node["previousNode"];
  if (!previousNode) return;
  const nextAvailableNeighbour = getNeighbour(grid, previousNode);
  if (nextAvailableNeighbour) {
    nextAvailableNeighbour["previousNode"] = previousNode;
    return nextAvailableNeighbour
  };
  return getNextAvailableNode(grid, previousNode);
};
