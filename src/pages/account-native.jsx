import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import JSONData from "../../data.json"

import DonutComponent from "../components/DonutChart/DonutComponent"
import LineChart from "../components/LineChart/LineChart"

import Layout from "../global/Layout"
import { Page } from "./index"

const Header = styled.h1`
  font-size: 5vw;
  margin-bottom: 4vw;
`


const AccountNative = () => {
    const [data, setData] = useState(null)

    useEffect(() => {
        if (JSONData) {
            setData(JSONData.data)
        }

    }, [])

    return (
        <Layout>
            <Page>
                {data ? (
                    <>
                        <Header>TotallyMoney.AccountNative</Header>
                        <svg viewBox="-2 0 100 100" preserveAspectRatio="xMidYMid meet">
                            <LineChart
                                positionX={25}
                                positionY={5}
                                selectedGroup={'ts'}
                                lineColour={'#2b7489'}
                            />
                            <LineChart
                                positionX={25}
                                positionY={5}
                                selectedGroup={'js'}
                                lineColour={'#f1e05a'}
                            />
                            <LineChart
                                positionX={25}
                                positionY={5}
                                selectedGroup={'json'}
                                lineColour={'#792d8e'}
                            />
                            <DonutComponent x={45} y={45} data={data[0].repos[2]} />
                        </svg>
                    </>
                ) : (<p>Loading</p>)
                }
            </Page>
        </Layout>
    )
}

export default AccountNative
