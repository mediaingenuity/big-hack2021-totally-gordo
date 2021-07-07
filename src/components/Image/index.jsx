import React from "react"
import styled from "styled-components"

import mosaic from "../../assets/images/mosaic_large.png"

const Img = styled.img`
  width: 100%;
  max-width: 1240px;
`

const Image = () => <Img src={mosaic} alt="TM team" />

export default Image
