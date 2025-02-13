import { Layout, H1 } from 'components'
import styled from 'styled-components'
import { NextPage } from 'next'
import { useState } from 'react'
import { InnerContainer } from 'styles'

const SettingsContainer = styled.div`
  width: 100%;
  margin: 50px auto;
  padding: 30px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`
const Section = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #ddd;
`

const Label = styled.span`
  font-size: 16px;
  font-weight: 500;
`

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;

  & input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  & span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #ccc;
    border-radius: 20px;
    transition: 0.3s;
  }

  & span:before {
    position: absolute;
    content: '';
    height: 14px;
    width: 14px;
    left: 3px;
    bottom: 3px;
    background: white;
    border-radius: 50%;
    transition: 0.3s;
  }

  & input:checked + span {
    background: #26de81;
  }

  & input:checked + span:before {
    transform: translateX(20px);
  }
`

const DeleteButton = styled.button`
  background: #ff4d4f;
  color: white;
  font-size: 16px;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  width: 100%;
  margin-top: 20px;

  &:hover {
    background: #d9363e;
    transform: scale(1.02);
  }
`

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`

const Modal = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  max-width: 400px;
`

const ModalText = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
  font-weight: 500;
`

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const ConfirmButton = styled.button`
  background: #ff4d4f;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;

  &:hover {
    background: #d9363e;
  }
`

const CancelButton = styled.button`
  background: #ddd;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;

  &:hover {
    background: #bbb;
  }
`

const Home: NextPage = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [showModal, setShowModal] = useState(false)

  const toggleDarkMode = () => setDarkMode(!darkMode)
  const toggleNotifications = () => setNotifications(!notifications)
  const handleDeleteAccount = () => {
    console.log('Account deleted!')
    setShowModal(false)
  }
  return (
    <Layout>
      <InnerContainer>
        <H1>SETTINGS</H1>
        <SettingsContainer>
          <Section>
            <Label>Dark Mode</Label>
            <ToggleSwitch>
              <input
                type="checkbox"
                checked={darkMode}
                onChange={toggleDarkMode}
              />
              <span></span>
            </ToggleSwitch>
          </Section>

          <Section>
            <Label>Enable Notifications</Label>
            <ToggleSwitch>
              <input
                type="checkbox"
                checked={notifications}
                onChange={toggleNotifications}
              />
              <span></span>
            </ToggleSwitch>
          </Section>

          <DeleteButton onClick={() => setShowModal(true)}>
            Delete Account
          </DeleteButton>

          {showModal && (
            <ModalOverlay>
              <Modal>
                <ModalText>
                  Are you sure you want to delete your account?
                </ModalText>
                <ModalButtonContainer>
                  <CancelButton onClick={() => setShowModal(false)}>
                    Cancel
                  </CancelButton>
                  <ConfirmButton onClick={handleDeleteAccount}>
                    Delete
                  </ConfirmButton>
                </ModalButtonContainer>
              </Modal>
            </ModalOverlay>
          )}
        </SettingsContainer>
      </InnerContainer>
    </Layout>
  )
}

export default Home
