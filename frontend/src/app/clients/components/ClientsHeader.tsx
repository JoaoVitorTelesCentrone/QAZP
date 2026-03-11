'use client'

import { Button } from 'antd'
import { FaUserPlus, FaUsers } from 'react-icons/fa'
import { intl } from '@/i18n'

type ClientsHeaderProps = {
  onCreate: () => void
}

export default function ClientsHeader({ onCreate }: ClientsHeaderProps) {
  return (
    <div className="p-10">
      <div className="flex mt-4 justify-between w-full">
        <div className="flex ml-48">
          <FaUsers className="w-16 h-16 p-1 rounded-full my-5 text-primary border-2 border-primary" />

          <h1 className="font-monospace font-semibold text-primary text-7xl my-4 mx-4 text-secondary-foreground">
            {intl.formatMessage({
              id: 'client.page.title',
            })}
          </h1>
        </div>

        <Button
          icon={<FaUserPlus className="w-5 h-5" />}
          type="primary"
          className="mt-8"
          size="large"
          onClick={onCreate}
        >
          <h1 className="text-lg">
            {intl.formatMessage({
              id: 'create.client.button.label',
            })}
          </h1>
        </Button>
      </div>
    </div>
  )
}