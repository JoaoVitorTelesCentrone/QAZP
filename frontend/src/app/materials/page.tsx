'use client'

import withAuth from '../hoc/withAuth'
import { useMaterials } from './hooks/useMaterials'
import MaterialsView from './MaterialsView'
import { useState } from 'react'

const MaterialsPage = () => {
  const { materials, loading, refetch } = useMaterials()
  const [openModal, setOpenModal] = useState(false)

  return (
    <MaterialsView
      materials={materials}
      loading={loading}
      openModal={openModal}
      setOpenModal={setOpenModal}
      refetch={refetch}
    />
  )
}

export default withAuth(MaterialsPage)