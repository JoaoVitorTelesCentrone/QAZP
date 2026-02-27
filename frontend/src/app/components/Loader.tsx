'use client'
import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

const Loader = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-quartenary z-50">
      <ClipLoader size={60} color="#123abc" />
    </div>
  )
}

export default Loader