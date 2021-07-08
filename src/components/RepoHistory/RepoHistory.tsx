import React from "react"
import styled from "styled-components"
import * as d3 from "d3"

import theme from "@totallymoney/ui/theme"
import data from "../../../data.json"
import { drag } from "../../util/drag"

export const Page = styled.div`
  width: 100%;
  height: 100%;
`

export const GraphContainer = styled.div`
  width: 80%;
  height: 100%;
  border: 1px solid magenta;
  margin-left: auto;
`

// {
//   "date": "2018-01-01T00:00:00.000Z",
//   "repos": [
//     {
//       "name": "TotallyMoney.Account",
//       "loc": {
//         "js": 50,
//         "ts": 10,
//         "json": 6
//       }
//     }
//   ]
// },

function sum(obj) {
  return Object.keys(obj).reduce(
    (sum, key) => sum + parseFloat(obj[key] || 0),
    0
  )
}

function max(obj) {
  const arr: any[] = Object.values(obj)
  return Math.max(...arr)
}

const width = 900
const height = 500
const centre = { x: width / 2, y: height / 2 }
const forceStrength = 0.03

const fillColour = d3.scaleLinear(d3.schemeDark2).domain([1, 5])

function charge(d) {
  return Math.pow(d.radius, 2.0) * 0.01
}

const forceSimulation = d3
  .forceSimulation()
  .velocityDecay(0.5)
  .force("x", d3.forceX().strength(forceStrength).x(centre.x))
  .force("y", d3.forceY().strength(forceStrength).y(centre.y))
  .force("charge", d3.forceManyBody().strength(charge))
  .force(
    "collision",
    d3.forceCollide().radius((d) => d.radius + 1)
  )

function draw(container: HTMLDivElement): void {
  const createNodes = (rawData) => {
    const maxSize = d3.max(rawData.repos, (d) => max(d.loc))
    const radiusScale = d3.scaleSqrt().domain([0, maxSize]).range([0, 80])

    const nodes = rawData.repos.map((d) => ({
      ...d,
      radius: radiusScale(sum(d.loc)),
      size: sum(d.loc),
      x: Math.random() * 900,
      y: Math.random() * 800,
      year: rawData.date,
    }))

    nodes.sort(function (a, b) {
      return b.value - a.value
    })

    return nodes
  }

  const chart = (selector, rawData) => {
    const nodes = createNodes(rawData)

    // create svg element inside provided selector
    const svg = d3
      .select(selector)
      .append("svg")
      .attr("width", width)
      .attr("height", height)

    // bind nodes data to circle elements
    const elements = svg
      .selectAll(".bubble")
      .data(nodes, (d) => d.id)
      .enter()
      .append("g")

    const bubbles = elements
      .append("circle")
      .classed("bubble", true)
      .attr("r", (d) => d.radius)
      .attr("fill", (d, i) => fillColour(i))
      .call(drag(forceSimulation))

    const labels = elements
      .append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .style("font-size", 10)
      .text((d) => d.name)

    const ticked = () => {
      bubbles.attr("cx", (d) => d.x).attr("cy", (d) => d.y)
      labels.attr("x", (d) => d.x).attr("y", (d) => d.y)
    }

    forceSimulation.nodes(nodes).on("tick", ticked).restart()
  }

  // @ts-ignore
  chart(container, data.data[0])
}

const RepoHistory = () => {
  const containerRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    draw(containerRef.current)
  }, [])

  return (
    <Page>
      <GraphContainer ref={containerRef}></GraphContainer>
    </Page>
  )
}

export default RepoHistory
