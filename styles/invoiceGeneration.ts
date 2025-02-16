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
  width: 954px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`

export const FormWrapper = styled.div`
  background-color: #fff;
  padding: 31px;
  border-radius: 4px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  gap: 30px;
  display: flex;
  flex-direction: column;
`

export const InvoiceDetails = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  gap: 26px;
`

export const DetailedSectionLeft = styled.div`
  display: grid;
  width: 30%;
  row-gap: 15px;
`

export const DetailedSectionRight = styled.div`
  display: grid;
  width: 40%;
  row-gap: 15px;
`

export const Label = styled.div`
  margin-bottom: 2px;
  font-size: 14px;
  width: 50%;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: #000000;
`

export const LableInline = styled.div`
  font-size: 14px;
  width: 50%;
  margin-right: 10px;
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

export const LineItems = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flexStart;
  gap: 5px;
`
export const LineItemHeader = styled.div`
  display: grid;
  column-gap: 6px;
  grid-template-columns: 60% 10% 10% 10% 5%;
  padding: 10px;
  color: #fff;
  background: #2a124f;
  border-radius: 2px;
`
export const LineItemHeaderItem = styled.div`
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  /* identical to box height */
  font-style: normal;
  color: #ffffff;
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
  width: 100%;
  display: flex;
  justify-content: flex-end;
`

export const FooterContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 35% 38%;
  gap: 240px;
`

export const FooterRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 5px;
`

export const FooterLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

export const Subtotal = styled.h2`
  font-size: 14px;
  display: flex;
  gap: 5px;
`

export const Duetotal = styled.h2`
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: #000000;
  display: flex;
  gap: 5px;
`
