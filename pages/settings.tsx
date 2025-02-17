import { Layout, H1, Switch } from 'components'
import { NextPage } from 'next'
import { useState } from 'react'
const Settings: NextPage = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [showModal, setShowModal] = useState(false)

  return (
    <Layout>
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-12 w-[954px]">
        <H1 className="text-center mb-6">SETTINGS</H1>

        <div className="space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <span className="text-lg font-medium">Dark Mode</span>
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
          </div>

          <div className="flex justify-between items-center border-b pb-4">
            <span className="text-lg font-medium">Enable Notifications</span>
            <Switch
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
            />
          </div>
        </div>

        <button
          className="w-full mt-6 py-3 text-white bg-red-500 rounded-lg font-semibold hover:bg-red-600 transition"
          onClick={() => setShowModal(true)}
        >
          Delete Account
        </button>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center ">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
              <p className="text-lg font-medium mb-4">
                Are you sure you want to delete your account?
              </p>
              <div className="flex justify-between">
                <button
                  className="px-4 py-2 bg-gray-300 text-black rounded-lg font-semibold hover:bg-gray-400 transition"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
                  onClick={() => {
                    console.log('Account deleted!')
                    setShowModal(false)
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Settings
