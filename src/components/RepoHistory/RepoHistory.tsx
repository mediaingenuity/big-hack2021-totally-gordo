import React from "react"
import styled from "styled-components"
import Button from "@totallymoney/ui/components/Button"
import { init } from "./chart"
import data from "../../../data.json"
import theme from "@totallymoney/ui/theme"

export const Page = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

export const GraphContainer = styled.div`
  width: 80%;
  height: 100%;
  border: 1px solid magenta;
  margin-left: auto;
  position: absolute;
  top: 0;
  right: 0;
`

export const ToolTip = styled.div`
  width: auto;
  display: flex;
  max-width: 500px;
  height: auto;
  padding: ${theme.spacingM};
  background-color: ${theme.almostWhite};
  position: absolute;
  top: 0;
  right: 0;
`

const RepoHistory = () => {
  const { data: newdata } = data
  const [drawing, setDrawing] = React.useState<any>(null)
  const containerRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    let force
    if (!drawing) {
      const objDraw = init(containerRef.current, newdata[0])
      force = objDraw.force
      setDrawing(objDraw)
    }
    return () => force.stop()
  }, [drawing, setDrawing])

  const handleSelectYear = (time: number) => {
    drawing.force.stop()
    drawing.graph.update(newdata[time])
  }

  return (
    <Page>
      {newdata.map((d, index) => {
        return (
          <Button
            key={`btn_${index}`}
            onClick={() => handleSelectYear(index)}
            variant="secondaryOutline"
          >
            {d.date}
          </Button>
        )
      })}

      <GraphContainer ref={containerRef}></GraphContainer>
      <ToolTip id="tooltip"></ToolTip>
    </Page>
  )
}

export default RepoHistory
