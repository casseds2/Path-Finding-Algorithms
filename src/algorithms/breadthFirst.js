import { isValidInput } from "./common";

export const breadthFirst = (grid, start, end) => {
 
  if (!isValidInput) return;

  const visitedNodes = [];
  const queue = [];
  start["isVisited"] = true;
  queue.push(start);

  while (!!queue.length) {
    const nextNode = queue.shift();
    visitedNodes.push(nextNode);
    if (nextNode === end) return visitedNodes;
    updateQueue(queue, grid, nextNode);
  }
};

const updateQueue = (queue, grid, node) => {
  const neighbours = getNeighbours(grid, node);
  for (const nNode of neighbours) {
    nNode["previousNode"] = node;
    nNode["isVisited"] = true;
    queue.push(nNode);
  }
};

const getNeighbours = (grid, { row, col }) => {
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
