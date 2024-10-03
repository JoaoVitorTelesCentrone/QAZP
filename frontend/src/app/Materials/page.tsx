'use client'
import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  Suspense,
} from 'react'
import UserSideMenu from '../components/UserHeader'
import { Button } from 'antd'
import axios from 'axios'
import { MaterialTable } from './MaterialTable'
import { materialColumns } from './columns'
import ClipLoader from 'react-spinners/ClipLoader'
import { CiPenpot } from 'react-icons/ci'
import { TbBasketPlus } from 'react-icons/tb'
import {
  formatCurrency,
  materialCategoryNameConverter,
} from '@/functions/functions'
import { useAtom } from 'jotai'
import { materialChangeAtom } from '../atoms/materialChange'
import CreateMaterialModal from './createMaterialModal'

export type MaterialProps = {
  id: string
  category: string
  price: string
  name: string
}

const Materials = () => {
  const [materials, setMaterials] = useState<MaterialProps[]>([])
  const [loading, setLoading] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [change] = useAtom(materialChangeAtom)

  const fetchMaterials = useCallback(async () => {
    setLoading(true)
    try {
      const response = await axios.get('http://localhost:5196/api/Material')
      const materialNames = response.data.map((material: any) => ({
        id: material.id,
        name: material.name,
        price: formatCurrency(material.price),
        category: materialCategoryNameConverter(material.category),
      }))
      setMaterials(materialNames)
    } catch (error) {
      console.error('Erro ao buscar materiais:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMaterials()
  }, [change, fetchMaterials])

  const columns = useMemo(() => materialColumns(), [])

  return (
    <div>
      {openModal && (
        <CreateMaterialModal
          isVisible={openModal}
          onClose={() => setOpenModal(false)}
        />
      )}
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={50} color={'#123abc'} loading={loading} />
        </div>
      ) : (
        <>
          <UserSideMenu />
            <div className="bg-tertiary h-full">
              <div className="p-10">
                <div className="flex mt-4 justify-between w-full">
                  <div className="flex ml-48">
                    <CiPenpot className="w-16 h-16 p-1 rounded-full my-4 text-primary border-2 border-primary" />
                    <h1 className="font-monospace font-semibold text-7xl my-3 ml-6 text-secondary-foreground">
                      Materiais
                    </h1>
                  </div>
                  <Button
                    icon={<TbBasketPlus className="w-5 h-5 " />}
                    type="primary"
                    className="mt-8"
                    size="large"
                    onClick={() => setOpenModal(true)}
                  >
                    <h1 className="text-lg">Criar material</h1>
                  </Button>
                </div>
              </div>
              <div className="ml-56 mr-10">
                <MaterialTable columns={columns} data={materials} />
              </div>
            </div>
        </>
      )}
    </div>
  )
}

export default Materials
