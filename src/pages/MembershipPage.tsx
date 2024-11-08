import React from 'react'

 const MembershipPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
    <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Membership</h2>
      <div className="bg-teal-50 p-4 rounded-md text-teal-700 font-bold mb-4">
        <p><strong>Current Package:</strong> Premium</p>
        <p><strong>Expiration Date:</strong> 31/12/2024</p>
      </div>
      <button className="mt-4 px-4 py-2 bg-teal-600 text-white font-medium rounded-md hover:bg-teal-700 transition duration-300">
        Upgrade or Renew
      </button>
    </div>
  </div>
  )
}

export default MembershipPage