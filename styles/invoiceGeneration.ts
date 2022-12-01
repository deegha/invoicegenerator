import styled from 'styled-components'

export const Title = styled.h1`
  font-weight: 100;
  font-size: 42px;
  margin: 0;
`

export const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  background-color: #e8ecef;
  min-height: 100vh;
`

export const InnerContainer = styled.div`
  width: 900px;
  background-color: #fff;
  padding: 40px;
  border-radius: 4px;
`

export const InvoiceDetails = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 40px;
`

export const DetailedSectionLeft = styled.div`
  display: grid;
  width: 50%;
  row-gap: 2px;
`

export const DetailedSectionRight = styled.div`
  display: grid;
  width: 40%;
  row-gap: 2px;
`

export const Lable = styled.div`
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: 14px;
  width: 50%;
`

export const LableInline = styled.div`
  font-size: 14px;
  width: 50%;
  margin-right: 10px;
`

export const LableContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 10px;
`

export const LineItems = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flexStart;
`
export const LineItemHeader = styled.div`
  display: grid;
  column-gap: 6px;
  grid-template-columns: 60% 10% 10% 10% 5%;
  background-color: #34495e;
  color: #ecf0f1;
  padding: 10px;
`
export const LineItemsContent = styled.div`
  margin-top: 5px;
`

export const Amount = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`

export const ButtonContainer = styled.div`
  float: left;
  margin-top: 50px;
  width: 100px;
`

export const FooterContainer = styled.div`
  margin-top: 50px;
  width: 100%;
  display: grid;
  column-gap: 20px;
  grid-template-columns: 20% 20% 20%;
`

export const Subtotal = styled.h2`
  font-size: 17px;
`

export const Duetotal = styled.h2`
  margin-top: 40px;
  font-size: 17px;
`
