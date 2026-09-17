'use client'

import ClipLoader from 'react-spinners/ClipLoader'

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader size={50} color="#123abc" loading />
    </div>
  )
}
