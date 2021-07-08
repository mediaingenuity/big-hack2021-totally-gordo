import { drag } from "../../util/drag"
import { sum, max } from "../../util/basicMath"
import * as d3 from "d3"

function charge(d) {
  return Math.pow(d.radius, 3.0) * 0.01
}

export default function draw(container: HTMLDivElement, data: any) {
  const containerRect = container.getBoundingClientRect()
  const height = containerRect.height
  const width = containerRect.width
  const centre = { x: width / 2, y: height / 2 }
  const forceStrength = 0.1
  const fillColour = d3.scaleOrdinal(d3.schemePaired)

  const createNodes = (rawData) => {
    const maxSize = d3.max(rawData.repos, (d) => max(d.loc))
    const radiusScale = d3.scaleSqrt().domain([0, maxSize]).range([0, 80])

    const nodes = rawData.repos.map((d) => ({
      ...d,
      radius: radiusScale(sum(d.loc)),
      size: sum(d.loc),
      x: Math.random() * width,
      y: Math.random() * height,
      year: rawData.date,
    }))

    nodes.sort(function (a, b) {
      return b.value - a.value
    })

    return nodes
  }

  let forceSimulation = d3
    .forceSimulation()
    .velocityDecay(0.5)
    .force("x", d3.forceX().strength(forceStrength).x(centre.x))
    .force("y", d3.forceY().strength(forceStrength).y(centre.y))
    .force("charge", d3.forceManyBody().strength(0.2))
  // .force(
  //   "collision",
  //   d3.forceCollide().radius((d) => {
  //     return d.radius + 3
  //   })
  // )

  const chart = (selector, rawData) => {
    const nodes = createNodes(rawData)

    const svg = d3
      .select(selector)
      .append("svg")
      .attr("width", width)
      .attr("height", height)

    let group = svg.append("g")

    let node = group
      .selectAll("circle")
      .data(nodes, (d) => d.id)
      .join((enter) =>
        enter
          .append("circle")
          .attr("class", (d) => `repo ${d.name}`)
          .attr("r", 0)
          .attr("fill", (d, i) => fillColour(i))
      )

    node
      .transition()
      .duration(1500)
      .attr("r", (d) => d.radius)

    // const labels = elements
    //   .append("text")
    //   .attr("dy", ".3em")
    //   .style("text-anchor", "middle")
    //   .style("font-size", 10)
    //   .text((d) => d.name)
    //   .style("opacity", 0)

    // labels.transition().duration(3000).style("opacity", 1)

    // Where the force updates the positioning
    function ticked() {
      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y)
      // labels.attr("x", (d) => d.x).attr("y", (d) => d.y)
    }

    forceSimulation.nodes(nodes).on("tick", ticked).restart()

    return Object.assign(svg.node(), {
      update(nodes) {
        const oldNodesMap = new Map(node.data().map((d) => [d.index, d]))
        const newNodes = nodes.map((d) => {
          return Object.assign(oldNodesMap.get(d.id) || {}, d)
        })

        node = node.join((update) =>
          update.attr("cx", (d) => d.x).attr("cy", (d) => d.y)
        )

        forceSimulation.nodes(nodes)
        forceSimulation.alpha(1).restart()
      },
    })
  }

  // @ts-ignore
  const graph = chart(container, data)

  return {
    force: forceSimulation,
    graph,
    createNodes,
  }
}

// repo = repo
//   .data(newNodes)
//   .join((enter) =>
//     enter
//       .append("circle")
//       .attr("r", (d) => d.radius)
//       .call(drag(forceSimulation))
//   )
//   .selection()
