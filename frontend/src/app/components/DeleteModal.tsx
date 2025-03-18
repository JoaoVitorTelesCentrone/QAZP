import { Button } from '@/components/ui/button'
import { intl } from '@/i18n'
import React, { useState } from 'react'

type deleteModalProps = {
  deleteRequest: () => void
}

const DeleteModal: React.FC<deleteModalProps> = ({ deleteRequest }) => {
  const [openModal, setOpenModal] = useState(true)
  return (
    <div>
      {openModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white shadow-lg shadow-slate-600 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">{intl.formatMessage({
              id: 'delete.button.label',
            })}
            </h2>
            <p className="text-gray-700">
              {intl.formatMessage({
                id: 'delete.user.confirmation.message',
              })}
            </p>
            <div className="justify-between">
              <Button
                onClick={() => deleteRequest()}
                className="mt-6 px-4 py-2 mx-4 bg-red-950 text-white border-2 border-red-950 rounded hover:bg-red-950 hover:text-white hover:border-0"
              >
                {intl.formatMessage({
                  id: 'delete.button.label',
                })}
              </Button>
              <Button
                onClick={prev => setOpenModal(!prev)}
                className="mt-6 px-4 py-2 mx-4 bg-white text-red-950 border-2 border-red-950 rounded hover:bg-red-950 hover:text-white hover:border-0"
              >
                {intl.formatMessage({
                  id: 'close.modal.button.label',
                })}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DeleteModal
