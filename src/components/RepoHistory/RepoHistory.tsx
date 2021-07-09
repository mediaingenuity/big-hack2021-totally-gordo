import React from "react"
import styled from "styled-components"
import { init } from "./chart"
import data from "../../../data.json"
import theme from "@totallymoney/ui/theme"
import { createNodes } from "../../util/createNodes"
import * as d3 from "d3"

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
  max-width: 300px;
  padding: ${theme.spacingM};
  background-color: rgba(255, 255, 255, 0.9);
  position: absolute;
  top: 0;
  right: 0;
  border-radius: ${theme.spacingS};
  border-bottom-left-radius: 0;
`

export const MenuYears = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  height: auto;
  padding: ${theme.spacingL};
  background-color: rgba(255, 255, 255, 0.9);
  position: fixed;
  bottom: ${theme.spacingS};
  left: ${theme.spacingS};
  border-radius: 62px;
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

const YearHeader = styled.div`
  position: fixed;
  top: 200px;
  transform: rotate(-90deg);
  z-index: 150;
  font-size: 36px;
  font-family: ${theme.buenosAires};
  color: ${theme.cloudyBlue};

  p {
    line-height: 0;
    padding: 0;
    margin: 0;
  }
`

const RepoHistory = () => {
  const [drawing, setDrawing] = React.useState<any>(null)
  const [year, setYear] = React.useState<any>(null)
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const format = d3.timeFormat("%B %Y")

  React.useEffect(() => {
    let force
    if (!drawing) {
      const objDraw = init(containerRef.current, createNodes(data[0]))
      force = objDraw.force
      setDrawing(objDraw)

      // first call
      setTimeout(() => {
        setYear(format(new Date(data[0].date)))
        objDraw.graph.update(createNodes(data[0]), data[0].date)
      }, 500)
    }
    return () => force?.stop()
  }, [drawing, setDrawing])

  const handleSelectYear = (index: number, time: Date) => {
    drawing.force.stop()
    setYear(format(new Date(time)))
    drawing.graph.update(createNodes(data[index]), data[index].date)
  }

  return (
    <Page>
      <MenuYears>
        {data.map((d, index) => {
          const time = format(new Date(d.date))
          return (
            <Button
              key={`btn_${index}`}
              onClick={() => handleSelectYear(index, time)}
              variant="secondaryOutline"
            >
              {time}
            </Button>
          )
        })}
      </MenuYears>

      <GraphContainer ref={containerRef}></GraphContainer>
      {year ? (
        <YearHeader>
          <p>{year}</p>
        </YearHeader>
      ) : null}

      <ToolTip id="tooltip"></ToolTip>
    </Page>
  )
}

export default RepoHistory
