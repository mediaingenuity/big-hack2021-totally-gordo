import { max, percentage } from "../util/basicMath";

const getMaxValue = (d) =>
  d.reduce((prev, current) => (prev.size > current.size ? prev : current));

const SUMWithoutJSON = (sum, json) => {
  if (!json) return sum;
  return sum - json;
};

export const createNodes = (d) => {
  const nodes = [];
  d.repos.forEach((node, index) => {
    const children = [];
    Object.keys(node.loc).forEach((item) => {
      if (item !== "SUM" && item !== "JSON") {
        children.push({
          name: item,
          size: node.loc[item],
          percentage: percentage(node.loc[item], node.loc),
        });
      }
    });
    nodes.push({
      id: index,
      name: node.name,
      children: children,
      maxValue: getMaxValue(children),
      size: SUMWithoutJSON(+node.loc.SUM, +node.loc.JSON),
    });
  });

  return nodes;
};
