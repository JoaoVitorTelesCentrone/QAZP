'use client'
import React, { useEffect, useMemo, useState } from 'react'
import UserSideMenu from '../components/UserHeader'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import axios from 'axios'
import { MaterialTable } from './MaterialTable'
import { materialColumns } from './columns'
import ClipLoader from 'react-spinners/ClipLoader'

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
    // console.log(response.data)
    const materialNames = response.data.map((material: any) => ({
      name: material.name,
      price: material.price,
      category: material.category,
    }))
    setMaterials(materialNames)
    console.log(materials)
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
          <div className="flex justify-between m-10">
            <h1 className="text-4xl font-bold ml-64">Materiais</h1>
            <Link
              href="/CreateMaterial"
              className="text-white bg-primary p-3 rounded-xl"
            >
              Criar Material
            </Link>
          </div>
          <div className="ml-10">
            <MaterialTable columns={columns} data={materials} />
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
