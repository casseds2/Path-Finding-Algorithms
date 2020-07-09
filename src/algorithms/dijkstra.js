import { flattenGrid, isValidInput } from "./common";

export const dijkstra = (grid, start, end) => {
  
  if (!isValidInput) return;

  const visitedNodes = [];
  const unvisitedNodes = flattenGrid(grid);
  start["distance"] = 0;

  while (!!unvisitedNodes.length) {
    unvisitedNodes.sort((n1, n2) => n1["distance"] - n2["distance"]);
    const nextNode = unvisitedNodes.shift();
    if (nextNode["distance"] === Infinity) return visitedNodes;
    nextNode["isVisited"] = true;
    visitedNodes.push(nextNode);
    if (nextNode === end) return visitedNodes;
    updateNeighbours(grid, nextNode);
  }
};

const updateNeighbours = (grid, node) => {
  const neighbours = getNeighbours(grid, node);
  for (const nNode of neighbours) {
    nNode["distance"] = node["distance"] + 1;
    nNode["previousNode"] = node;
  }
};

const getNeighbours = (grid, { col, row }) => {
  const neighbours = [];
  if (col > 0) neighbours.push(grid[col - 1][row]);
  if (row < grid[col].length - 1) neighbours.push(grid[col][row + 1]);
  if (col < grid.length - 1) neighbours.push(grid[col + 1][row]);
  if (row > 0) neighbours.push(grid[col][row - 1]);
  return neighbours.filter(node => {
    if (node.isVisited) return false;
    if (node.isWall) return false;
    return true;
  });
};