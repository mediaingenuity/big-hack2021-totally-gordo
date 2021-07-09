import * as React from "react"
import * as d3 from "d3"
import { navigate } from "gatsby"
import theme from "@totallymoney/ui/theme"

const languages = [
  "C#",
  "XSD",
  "Web Services Description",
  "MSBuild script",
  "XML",
  "Cucumber",
  "Visual Studio Solution",
  "Markdown",
  "ASP.NET",
  "SUM",
  "JavaScript",
  "JSON",
  "JSX",
  "LESS",
  "Bourne Again Shell",
  "SVG",
  "HTML",
  "YAML",
  "CSS",
  "Razor",
  "Bourne Shell",
  "F#",
  "TypeScript",
  "DOS Batch",
  "SQL",
  "PowerShell",
  "F# Script",
  "Sass",
  "CoffeeScript",
  "Ruby",
  "Dockerfile",
  "CSV",
  "PHP",
  "Elm",
  "EJS",
  "Python",
  "TOML",
  "Mustache",
  "Go",
  "Java",
  "Objective-C",
  "Gradle",
  "C/C++ Header",
  "ProGuard",
  "awk",
  "Jupyter Notebook",
  "reStructuredText",
  "make",
  "GraphQL",
  "XAML",
]

const COLOR = Object.entries(theme)
  .filter(
    ([key, value]) =>
      key.includes("dataVisualisation") || key.includes("eligibilityLevel")
  )
  .map(([_, color]) => color)

const colors = d3.scaleOrdinal().domain(languages).range(COLOR)

export const init = (container: HTMLDivElement, data) => {
  const containerRect = container.getBoundingClientRect()
  const HEIGHT = containerRect.height
  const WIDTH = containerRect.width
  const maxSize = d3.max(data, (d) => Math.max(d.maxValue.size))
  const radiusScale = d3.scaleSqrt().domain([0, maxSize]).range([0, 120])

  let ticked

  const SVG = d3
    .select(container)
    .append("svg")
    .attr("viewBox", [-WIDTH / 2, -HEIGHT / 2, WIDTH, HEIGHT])

  const forceSimulation = d3
    .forceSimulation(data)
    .force(
      "collision",
      d3.forceCollide().radius((d) => radiusScale(d.size))
    )
    .force("center", d3.forceCenter().strength(0.1))
    .force("charge", d3.forceManyBody().strength(-100))
    .force("x", d3.forceX())
    .force("y", d3.forceY())

  const g = SVG.append("g")
  let nodesGroup = g.append("g").attr("class", "nodes")

  let node = nodesGroup
    .selectAll("circle")
    .data(data)
    .join((enter) =>
      enter
        .append("circle")
        .attr("class", (d) => `github ${d.name}`)
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y)
        .attr("r", (d) => 0)
        .attr("fill", (d) => colors(d.maxValue.name))
    )

  let labels = g.append("g").attr("class", "label-g")
  let labelsName = g.append("g").attr("class", "label-name-g")
  let label = labels
    .selectAll("text")
    .data(data)
    .join((enter) =>
      enter
        .append("text")
        .attr("class", "label")
        .attr("text-anchor", "start")
        .style("opacity", 0.2)
    )

  let labelName = labelsName
    .selectAll("text")
    .data(data)
    .join((enter) =>
      enter
        .append("text")
        .attr("class", "label")
        .attr("text-anchor", "start")
        .style("opacity", 0.4)
        .attr("fill", theme.grey)
    )

  node.transition().duration(500)

  SVG.call(
    d3
      .zoom()
      .extent([
        [0, 0],
        [WIDTH, HEIGHT],
      ])
      .scaleExtent([-100, 10])
      .on("zoom", zoomed)
  )

  let tooltip = d3.select("#tooltip")

  ticked = () => {
    node
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", (d) => radiusScale(d.size))
      .attr("fill", (d) => colors(d.maxValue.name))

    label
      .attr("x", (d) => d.x - 50)
      .attr("y", (d) => d.y)
      .text((d) => `${d.maxValue.percentage} % ${d.maxValue.name}`)
      .style("font-size", "12px")

    labelName
      .attr("x", (d) => d.x - 50)
      .attr("y", (d) => d.y - 20)
      .text((d) => `${d.name}`)
      .style("font-size", "16px")
  }

  function zoomed({ transform }) {
    g.attr("transform", transform)
  }

  forceSimulation.stop()

  return {
    force: forceSimulation,
    graph: Object.assign(SVG.node(), {
      update(nodes, date) {
        console.log(date)
        const oldNodesMap = new Map(node.data().map((d) => [d.id, d]))
        const newNodes = nodes.map((d) => {
          return Object.assign(oldNodesMap.get(d.id) || {}, d)
        })

        node = node
          .data(newNodes, (d) => d.id)
          .join(
            (enter) =>
              enter
                .append("circle")
                .attr("class", (d) => `github ${d.name}`)
                .attr("cx", (d) => d.x)
                .attr("cy", (d) => d.y)
                .attr("r", (d) => 0),
            (update) =>
              update
                .transition()
                .duration(750)
                .ease(d3.easeLinear)
                .attr("r", (d) => radiusScale(d.size))
          )
          .selection()

        label = labels
          .selectAll("text")
          .data(newNodes, (d) => d.id)
          .join((enter) =>
            enter
              .append("text")
              .attr("class", ".label")
              .attr("text-anchor", "start")
              .style("opacity", 0.2)
          )

        labelName = labelsName
          .selectAll("text")
          .data(newNodes, (d) => d.id)
          .join((enter) =>
            enter
              .append("text")
              .attr("text-anchor", "start")
              .style("opacity", 0.4)
              .attr("fill", theme.grey)
          )

        node.on("click", (event, d) => {
          navigate(`/languages?repo=${d.name}&date=${date}`)
        })

        function getNodeToolTip(item) {
          let details = ``

          item.forEach((item) => {
            details = `${details} <div style="margin: 3px 0">
                <span style="background-color:${colors(item.name)}">${
              item.name
            }</span> ${item.size} files
              </div>`
          })

          return details
        }

        node.on("mouseover", (event, d) => {
          let details = getNodeToolTip(d.children)

          tooltip
            .style("opacity", 1)
            .style("display", "flex")
            .style("flex-direction", "column")
            .style("left", event.pageX + 10 + "px")
            .style("top", `${event.pageY + d.children.length}px`)
            .html(details)
        })

        labelName.on("mouseover", (event, d) => {
          let details = getNodeToolTip(d.children)
          tooltip
            .style("opacity", 1)
            .style("display", "flex")
            .style("left", event.pageX + 10 + "px")
            .style("top", `${event.pageY + d.children.length}px`)
            .html(details)
        })

        node.on("mouseout", (event, d) => {
          tooltip.style("opacity", 0).style("display", "none")
        })

        labelName.on("mouseout", (event, d) => {
          tooltip.style("opacity", 0).style("display", "none")
        })

        forceSimulation.nodes(newNodes)
        forceSimulation.alphaTarget(0.01).restart().tick()
        forceSimulation.on("tick", ticked)
      },
    }),
  }
}
