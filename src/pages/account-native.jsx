import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import JSONData from "../../data.json"

import DonutComponent from "../components/DonutChart/DonutComponent"

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
                            <DonutComponent x={15} y={20} data={data[0].repos[2]} />
                        </svg>
                    </>
                ) : (<p>Loading</p>)
                }
            </Page>
        </Layout>
    )
}

export default AccountNative
