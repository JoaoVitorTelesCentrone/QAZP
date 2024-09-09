'use client'
import React, { useEffect, useMemo, useState } from 'react'
import UserSideMenu from '../components/UserHeader'
import { Button } from 'antd'
import Link from 'next/link'
import axios from 'axios'
import { MaterialTable } from './MaterialTable'
import { materialColumns } from './columns'
import ClipLoader from 'react-spinners/ClipLoader'
import { Plus } from 'lucide-react'
import { CiPenpot } from 'react-icons/ci'
import { TbBasketPlus } from 'react-icons/tb'

import {
  formatCurrency,
  materialCategoryNameConverter,
} from '@/functions/functions'
import { ClassNames } from '@emotion/react'

export type materialProps = {
  id: string
  category: string
  price: string
  name: string
}

const Materials = () => {
  const [materials, setMaterials] = useState<materialProps[]>([])
  const [materialsName, setMaterialsName] = useState('')
  const [loading, setLoading] = useState(false)
  const getMaterial = async () => {
    const response = await axios.get('http://localhost:5196/api/Material')
    setMaterialsName(response.data)

    const materialNames = response.data.map((material: any) => ({
      name: material.name,
      price: formatCurrency(material.price),
      category: materialCategoryNameConverter(material.category),
    }))
    setMaterials(materialNames)
  }

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 500))
      await Promise.all([getMaterial()])
      setLoading(false)
    }
    fetch()
  }, [])

  const columns = useMemo(() => materialColumns(), [])
  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={50} color={'#123abc'} loading={loading} />
        </div>
      ) : (
        <>
          <UserSideMenu />
          <div className="bg-tertiary h-screen">
            <div >
              <div className="p-10 ">
                <div className="flex mt-4 justify-between w-full">
                  <div className="flex ml-64">
                    <CiPenpot className=" w-16 h-16 p-1 rounded-full my-4 text-primary border-2 border-primary" />

                    <h1 className="font-monospace font-semibold text-7xl my-3 ml-6 text-secondary-foreground">
                      Materiais
                    </h1>
                  </div>
                  <Button
                    icon={<TbBasketPlus className="w-5 h-5 " />}
                    type="primary"
                    className="mt-8"
                    size="large"
                  >
                    <Link href="/CreateMaterial" className="text-lg">
                      Criar material
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="ml-72 mr-10">
                <MaterialTable columns={columns} data={materials} />
              </div>
            </div>
          </div>
          {/* {materials.map((material, index) => (
        <div key={index} className="flex justify-around w-full p-4">
        <h1 key={index}>{material.name}</h1>
        <h1 key={index}>{material.category}</h1>
        <h1 key={index}>{material.price}</h1>
        </div>
        ))} */}
        </>
      )}
    </div>
  )
}

export default Materials
