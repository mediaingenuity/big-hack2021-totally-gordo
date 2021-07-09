import { max, percentage } from "../util/basicMath"

const getMaxValue = (d) =>
  d.reduce((prev, current) => (prev.size > current.size ? prev : current))

export const createNodes = (d) => {
  const nodes = []
  d.repos.forEach((node, index) => {
    const children = []
    Object.keys(node.loc).forEach((item) => {
      if (item !== "SUM") {
        children.push({
          name: item,
          size: node.loc[item],
          percentage: percentage(node.loc[item], node.loc),
        })
      }
    })
    nodes.push({
      id: index,
      name: node.name,
      children: children,
      maxValue: getMaxValue(children),
      size: +node.loc.SUM,
    })
  })

  return nodes
}
