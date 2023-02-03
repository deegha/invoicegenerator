import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    font-family: 'Helvetica';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    /* identical to box height */

    color: #000000;
  }
`

interface Item {
  lable: React.ReactNode
  value: React.ReactNode
}

export const FooterItem: React.FC<Item> = ({ lable, value }) => {
  return (
    <Container>
      <div>{lable}</div>
      <div>{value}</div>
    </Container>
  )
}
