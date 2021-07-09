import React, { useState } from "react"
import { scaleOrdinal } from "d3-scale"
import { pie } from "d3-shape"
import theme from "@totallymoney/ui/theme"

import SliceComponent from "./SliceComponent"

const donutTextStyle = {
    fontSize: "1.5px",
    fontFamily: theme.buenosAires,
    fontWeight: "bold",
}

const lineSubTitleTextStyle = {
    fontSize: "3px",
    fontFamily: theme.buenosAires,
    fontWeight: "bold",
}

const DonutComponent = props => {
    const { x, y, data, onChangeGroup } = props

    //react hooks
    const [donutTitle, setDonutTitle] = useState("")
    const [textFill, setTextFill] = useState("")
    const [selectedCount, setSelectedCount] = useState("")

    //slices d3 color definition
    const COLOR = Object.entries(theme).filter(([key, value]) => key.includes('dataVisualisation')).map(([_, color]) => color)
    const colorScale = scaleOrdinal(COLOR)

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
    const total = measures.reduce((acc, value) => {
        return acc + value
    }, 0)

    return (
        <g transform={`translate(${x}, ${y})`}>
            <text
                textAnchor="middle"
                style={lineSubTitleTextStyle}
                fill="grey"
                x={0}
                y={-28}
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
                        {(selectedCount / total * 100).toFixed(2)}%
                    </tspan>
                )}
            </text>
        </g>
    )
}

export default DonutComponent
