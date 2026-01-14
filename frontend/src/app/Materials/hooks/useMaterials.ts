import { useState, useEffect, useCallback } from 'react'
import { fetchActiveMaterials } from '../services/materialService'
import { MaterialProps } from '../types/material'
import { useAtom } from 'jotai'
import { materialChangeAtom } from '../../atoms/materialChange'
import { formatCurrency, materialCategoryNameConverter } from '../mappers/materialMapper'

export const useMaterials = () => {
  const [materials, setMaterials] = useState<MaterialProps[]>([])
  const [loading, setLoading] = useState(true)
  const [change] = useAtom(materialChangeAtom)

  const fetchMaterials = useCallback(async () => {
    setLoading(true)
    try {
      const data = await fetchActiveMaterials()
      const materialNames = data.map(m => ({
        ...m,
        price: formatCurrency(m.price),
        category: materialCategoryNameConverter(Number(m.category)),
      }))
      setMaterials(materialNames)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMaterials()
  }, [change, fetchMaterials])

  return { materials, loading, refetch: fetchMaterials }
}