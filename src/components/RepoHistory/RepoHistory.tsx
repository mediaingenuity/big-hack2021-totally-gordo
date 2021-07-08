import React from "react"
import styled from "styled-components"

import theme from "@totallymoney/ui/theme"
import draw from "./chart"

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
