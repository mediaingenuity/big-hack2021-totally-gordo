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
                                group={'ts'}
                                lineColour={'#2b7489'}
                                lineChartData={[
                                    { category: 2008, measure: 289309 },
                                    { category: 2009, measure: 234998 },
                                    { category: 2010, measure: 310900 },
                                    { category: 2011, measure: 223900 },
                                    { category: 2012, measure: 234500 },
                                    { category: 2013, measure: 234500 },
                                ]}
                            />
                            <LineChart
                                positionX={25}
                                positionY={5}
                                group={'js'}
                                lineColour={'#f1e05a'}
                                lineChartData={[
                                    { category: 2008, measure: 100000 },
                                    { category: 2009, measure: 234968 },
                                    { category: 2010, measure: 310950 },
                                    { category: 2011, measure: 223940 },
                                    { category: 2012, measure: 500000 },
                                    { category: 2013, measure: 500000 },
                                ]}
                            />
                            <LineChart
                                positionX={25}
                                positionY={5}
                                group={'json'}
                                lineColour={'#792d8e'}
                                lineChartData={[
                                    { category: 2008, measure: 5000 },
                                    { category: 2009, measure: 220000 },
                                    { category: 2010, measure: 310950 },
                                    { category: 2011, measure: 223940 },
                                    { category: 2012, measure: 500000 },
                                    { category: 2013, measure: 450000 },
                                ]}
                            />
                            {/*<DonutComponent x={45} y={45} data={data[0].repos[2]} />*/}
                        </svg>
                    </>
                ) : (<p>Loading</p>)
                }
            </Page>
        </Layout>
    )
}

export default AccountNative
