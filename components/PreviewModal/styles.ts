import styled, { keyframes } from 'styled-components'

const appearAnimation = keyframes`
  0% { opacity: 0;  }
  100% { opacity: 1; }
`

const appearModalAnimation = keyframes`
  0% { opacity: 0; transform: translateY(10px);  }
  100% { opacity: 1; transform: translateY(0); }
`

export const ContainerOuter = styled.div<{ showModal: boolean }>`
  animation-name: ${appearAnimation};
  animation-duration: 0.2s;

  position: fixed;
  display: none;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;

  background: linear-gradient(
    126.72deg,
    rgba(0, 0, 0, 0.71) -8.9%,
    rgba(0, 0, 0, 0.71) 105.79%
  );
  backdrop-filter: blur(2px);
  display: ${({ showModal }) => (showModal ? `flex` : 'none')};
  align-items: center;
  justify-content: center;
`

export const ModalWrapper = styled.div`
  max-width: 595px;
  background: transparent;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
`

export const Modal = styled.div`
  width: 595px;
  background: #ffffff;
  padding: 50px 20px;
  animation-name: ${appearModalAnimation};
  animation-duration: 0.3s;
`

export const Container = styled.div`
  font-size: 12px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const LineItemHeader = styled.div`
  display: grid;
  column-gap: 6px;
  grid-template-columns: 58% 13% 10% 15%;
  background: #2f2f2f;
  border-radius: 2px;
  padding: 6px 10px;
  color: #ffffff;
  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
`

export const PageContainer = styled.div`
  background-color: #ffffff;
  padding: 30px;
  width: 595px;
`

export const DetailsContainer = styled.div`
  background-color: #ffffff;
  display: grid;
  grid-row-gap: 40px;
  grid-column-gap: 10%;
  grid-template-columns: 30% 60%;
`

export const BillingHeading = styled.div`
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: #000000;
  margin-bottom: 12px;
`

export const FromToAddress = styled.div`
  text-align: left;
  max-width: 200px;
  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #000000;
`

export const InvoiceNumber = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #424447;
`

export const InvoiceNumberTitle = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 30px;
`

export const Details = styled.div`
  text-align: right;
  letter-spacing: 1px;
  line-height: 20px;
  display: grid;
  gap: 10px;
  grid-template-columns: 56% 40%;
`

export const DetailsDescription = styled.div`
  text-align: right;
  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #9a9a9a;
`

export const BalanceDue = styled.div`
  text-align: right;
  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  color: #000000;
`

export const Detail = styled.div`
  text-align: right;
  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #000000;
`

export const Items = styled.div`
  margin: 40px 0;
`

export const ButtonArea = styled.div`
  padding: 10px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`

export const ReviewButton = styled.div`
  width: 226px;
`

export const HeaderRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 45px;
`

export const InvoiceNumberContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

export const TotalArea = styled.div`
  display: grid;
  grid-template-columns: 15% 8%;
  justify-content: end;
  width: 100%;
  margin-bottom: 20px;
`

export const TotalTitle = styled.div`
  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #9a9a9a;
`

export const TotalValue = styled.div`
  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  text-align: right;
  color: #000000;
`

export const CloseButton = styled.div`
  cursor: pointer;
`
