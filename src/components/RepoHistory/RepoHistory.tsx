import React from "react"
import styled from "styled-components"
import { init } from "./chart"
import data from "../../../data.json"
import theme from "@totallymoney/ui/theme"
import { createNodes } from "../../util/createNodes"
import * as d3 from "d3"

console.log(theme)
export const Page = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: ${theme.neutral120};
`

export const GraphContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
`

export const ToolTip = styled.div`
  width: auto;
  display: none;
  max-width: 500px;
  padding: ${theme.spacingM};
  background-color: ${theme.almostWhite};
  position: absolute;
  top: 0;
  right: 0;
`

export const MenuYears = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  height: auto;
  padding: ${theme.spacingXS};
  background-color: rgba(255, 255, 255, 0.9);
  position: fixed;
  bottom: ${theme.spacingS};
  left: ${theme.spacingS};
  border-radius: ${theme.borderRadius};
  border-bottom-left-radius: 0;
  z-index: 10;
`

const Button = styled.div`
  padding: ${theme.spacingXS};
  display: block;
  cursor: pointer;
  color: ${theme.textColorLight};
  font-size: 12px;
`

const RepoHistory = () => {
  const [drawing, setDrawing] = React.useState<any>(null)
  const containerRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    let force
    if (!drawing) {
      const objDraw = init(containerRef.current, createNodes(data[0]))
      force = objDraw.force
      setDrawing(objDraw)
    }
    return () => force.stop()
  }, [drawing, setDrawing])

  const handleSelectYear = (time: number) => {
    drawing.force.stop()
    drawing.graph.update(createNodes(data[time]))
  }

  return (
    <Page>
      <MenuYears>
        {data.map((d, index) => {
          const format = d3.timeFormat("%B %Y")
          return (
            <Button
              key={`btn_${index}`}
              onClick={() => handleSelectYear(index)}
              variant="secondaryOutline"
            >
              {format(new Date(d.date))}
            </Button>
          )
        })}
      </MenuYears>

      <GraphContainer ref={containerRef}></GraphContainer>
      <ToolTip id="tooltip"></ToolTip>
    </Page>
  )
}

export default RepoHistory
