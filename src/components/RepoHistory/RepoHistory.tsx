import React from "react"
import styled from "styled-components"
import theme from "@totallymoney/ui/theme"
import Button from "@totallymoney/ui/components/Button"
import draw from "./chart"
import data from "../../../data.json"

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

const RepoHistory = () => {
  const [drawing, setDrawing] = React.useState<any>(null)
  const containerRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (!drawing) {
      setDrawing(draw(containerRef.current, data.data[0]))
    }
  }, [drawing, setDrawing])

  const handleSelectYear = () => {
    const nodes = drawing.createNodes(data.data[1])
    console.log(nodes)
    drawing.graph.update(nodes)
  }

  return (
    <Page>
      <Button onClick={handleSelectYear} variant="secondaryOutline">
        here
      </Button>
      <GraphContainer ref={containerRef}></GraphContainer>
    </Page>
  )
}

export default RepoHistory
