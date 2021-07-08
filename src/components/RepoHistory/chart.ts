import * as React from "react"
import * as d3 from "d3"

import { drag } from "../../util/drag"
import { sum, max } from "../../util/basicMath"

const colors = d3.scaleLinear().domain([1, 25]).range(d3.schemeDark2)

export const init = (container: HTMLDivElement, data) => {
  const nodes = data.repos

  const containerRect = container.getBoundingClientRect()
  const HEIGHT = containerRect.height
  const WIDTH = containerRect.width
  const centre = { x: WIDTH / 2, y: HEIGHT / 2 }
  const forceStrength = 0.1

  const maxSize = d3.max(data.repos, (d) => max(d.loc))
  const radiusScale = d3.scaleSqrt().domain([0, maxSize]).range([0, 120])

  let ticked

  const SVG = d3
    .select(container)
    .append("svg")
    .attr("viewBox", [-WIDTH / 2, -HEIGHT / 2, WIDTH, HEIGHT])

  const forceSimulation = d3
    .forceSimulation(nodes)
    .force(
      "collision",
      d3.forceCollide().radius((d) => radiusScale(d.loc.SUM))
    )
    .force("center", d3.forceCenter().strength(1))
    .force("charge", d3.forceManyBody().strength(-300))
    .force("x", d3.forceX())
    .force("y", d3.forceY())
    .alphaTarget(0.1)

  let node = SVG.append("g")
    .selectAll("circle")
    .data(nodes)
    .join((enter) =>
      enter
        .append("circle")
        .attr("class", (d) => `github ${d.name}`)
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y)
        .attr("r", 0)
        .attr("fill", (d) => colors(d.index))
        .call(drag(forceSimulation))
    )

  node.transition().duration(1000)

  let tooltip = d3.select("#tooltip")

  ticked = () => {
    node
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", (d) => radiusScale(d.loc.SUM))
      .attr("fill", (d) => colors(d.index))
  }

  forceSimulation.stop()

  return {
    force: forceSimulation,
    graph: Object.assign(SVG.node(), {
      update(data) {
        const nodes = data.repos
        const oldNodesMap = new Map(node.data().map((d) => [d.index, d]))
        const newNodes = nodes.map((d) => {
          return Object.assign(oldNodesMap.get(d.id) || {}, d)
        })

        node = node
          .data(newNodes, (d) => d.id)
          .join((enter) =>
            enter
              .append("circle")
              .attr("class", (d) => `github ${d.name}`)
              .attr("cx", (d) => d.x)
              .attr("cy", (d) => d.y)
              .attr("r", (d) => {
                console.log(d)
                return radiusScale(d.loc.SUM)
              })

              .call(drag(forceSimulation))
          )
          .selection()

        node
          .transition()
          .duration(1000)
          .attr("cx", (d) => d.x)
          .attr("cy", (d) => d.y)

        node.on("mouseover", (event, d) => {
          tooltip
            .style("opacity", 1)
            .style("display", "flex")
            .style("left", event.pageX + 10 + "px")
            .style("top", `${event.pageY + Object.keys(d.loc).length}px`).html(`
              ${d.name} <br/><br/>
              ${Object.keys(d.loc).map((key) => `${key} ${d.loc[key]} <br/>`)}
              `)
        })

        node.on("mouseout", (event, d) => {
          tooltip.style("opacity", 0).style("display", "none")
        })

        forceSimulation.nodes(newNodes)
        forceSimulation.alphaTarget(0.01).restart().tick()
        forceSimulation.on("tick", ticked)
      },
    }),
  }
}
