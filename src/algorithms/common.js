export const isValidInput = (start, end) => {
  return !start || !end || start === end;
};

export const getShortestPath = (node, path = []) => {
  path.push(node);
  if (node["previousNode"] === null) {
    return path;
  }
  return getShortestPath(node["previousNode"], path);
};

export const flattenGrid = grid => {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
};
