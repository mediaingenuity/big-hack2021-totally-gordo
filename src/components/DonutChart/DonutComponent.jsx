import React, { useState } from "react"
import { scaleOrdinal } from "d3-scale"
import { pie } from "d3-shape"
import { schemeCategory10 } from "d3"

import SliceComponent from "./SliceComponent"

const donutTextStyle = {
    fontSize: "1.5px",
    fontFamily: "verdana",
    fontWeight: "bold",
}

const lineSubTitleTextStyle = {
    fontSize: "2px",
    fontFamily: "verdana",
    fontWeight: "bold",
}

const DonutComponent = props => {
    const { x, y, data, onChangeGroup } = props

    //react hooks
    const [donutTitle, setDonutTitle] = useState("")
    const [textFill, setTextFill] = useState("")
    const [selectedCount, setSelectedCount] = useState("")

    //slices d3 color definition
    const colorScale = scaleOrdinal(schemeCategory10)

    //main function responding to a click on a slice
    const onClickSlice = (label, fill, value) => {
        setDonutTitle(label)
        setSelectedCount(value.data)
        setTextFill(fill)
        // onChangeGroup(label, fill);
    }

    //wrapper function for the pie chart to
    //render slices as ReactJs components
    const renderSlice = measure => {
        const index = measure.index
        const content = Object.entries(data.loc)
        return (
            <SliceComponent
                key={index}
                index={index}
                value={measure}
                label={content[index][0]}
                fill={colorScale(index)}
                onClickSlice={onClickSlice}
            />
        )
    }

    //creation of the pie
    let pieChart = pie().sort(null)
    //creation of the data array from test data
    const measures = Object.entries(data.loc).map(([_, value]) => value)

    return (
        <g transform={`translate(${x}, ${y})`}>
            <text
                textAnchor="middle"
                style={lineSubTitleTextStyle}
                fill="lightgrey"
                x={0}
                y={-18}
            >
                Current language percentage
            </text>

            {pieChart(measures).map(renderSlice)}
            <text
                x="0"
                y="-1.5em"
                textAnchor="middle"
                style={donutTextStyle}
                fill={textFill}
            >
                {donutTitle && (
                    <tspan dy="1em" x="0.3em">
                        {donutTitle}{" "}
                    </tspan>
                )}
                {selectedCount && (
                    <tspan dy="1.5em" x="0.3em">
                        {selectedCount}%
                    </tspan>
                )}
            </text>
        </g>
    )
}

export default DonutComponent
