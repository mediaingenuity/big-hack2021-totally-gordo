import * as d3 from "d3"

export const createNodes = (d) => {
  const nodes = []
  d.repos.forEach((node, index) => {
    const children = []
    Object.keys(node.loc).forEach((item) => {
      if (item !== "SUM") {
        children.push({
          name: item,
          size: +node.loc[item],
        })
      }
    })
    nodes.push({
      id: index,
      name: node.name,
      children: children,
      size: +node.loc.SUM,
    })
  })

  return nodes
}
