import React from "react"
import styled from "styled-components"
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
    let force
    if (!drawing) {
      const objDraw = draw(containerRef.current, data.data[0])
      force = objDraw.force
      setDrawing(objDraw)
    }
    return () => force.stop()
  }, [drawing, setDrawing])

  const handleSelectYear = (time: number) => {
    const nodes = drawing.createNodes(data.data[time])
    drawing.graph.update(nodes)
  }

  return (
    <Page>
      <Button onClick={() => handleSelectYear(0)} variant="secondaryOutline">
        month 1
      </Button>
      <Button onClick={() => handleSelectYear(1)} variant="secondaryOutline">
        month 2
      </Button>
      <Button onClick={() => handleSelectYear(2)} variant="secondaryOutline">
        month 3
      </Button>
      <GraphContainer ref={containerRef}></GraphContainer>
    </Page>
  )
}

export default RepoHistory
