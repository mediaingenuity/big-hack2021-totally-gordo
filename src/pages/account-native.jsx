import React, { useState } from 'react'
import styled from "styled-components"

import DonutComponent from "../components/DonutChart/DonutComponent"
import BarChart from "../components/BarChart/BarChart"
import LineChart from "../components/LineChart/LineChart"

import Layout from "../global/Layout"
import { Page } from "./index"

const Header = styled.h1`
  font-size: 5vw;
  margin-bottom: 4vw;
`


const AccountNative = () => {
    // React hooks with common state values for all components
    const [selectedGroup, setSelectedGroup] = useState("All")
    const [groupColour, setGroupColour] = useState("lightgrey")

    //function that will hook into the state to change it
    function updateBarChart(group, colour) {
        setSelectedGroup(group)
        setGroupColour(colour)
    }

    return (
        <Layout>
            <Page>
                <Header>Repositories Overview</Header>
                <svg viewBox="-2 0 100 100" preserveAspectRatio="xMidYMid meet">
                    <DonutComponent x={15} y={20} onChangeGroup={updateBarChart} />
                    <BarChart
                        positionX={35}
                        positionY={50}
                        width={80}
                        height={100}
                        selectedGroup={selectedGroup}
                        barColour={groupColour}
                    />
                    <LineChart
                        positionX={35}
                        positionY={4}
                        selectedGroup={selectedGroup}
                        lineColour={groupColour}
                    />
                </svg>
            </Page>
        </Layout>
    )
}

export default AccountNative
