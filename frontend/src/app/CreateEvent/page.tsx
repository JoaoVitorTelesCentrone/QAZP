'use client'
import React, { useState, useEffect } from 'react'
import UserSideMenu from '../components/UserHeader'
import axios from 'axios'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PlusCircleIcon } from 'lucide-react'
import { materialProps } from '../Materials/page'

type ClientProps = {
  id: string
  name: string
  documentId: string
  email: string
}

type MaterialType = { 
  category: string
  name: string
  price: string
  quantity: number
}

type insertMaterialProps = {
  name: string
  index: number 

} 

const MaterialCategory =
    [

      {name: 'Comida', index: 0},
      {name: 'Decoração', index: 1},
      {name: 'Utensilios', index: 2},
      {name: 'Mobilia', index: 3},
      {name: 'Recursos humanos', index: 4},
      {name: 'Aluguel', index: 5},
      {name: 'Entretenimento', index: 6},
      {name: 'Marketing', index: 7},
    ]
    

const CreateEvent = () => {
  const [clients, setClients] = useState<ClientProps[]>([])
  const [clientEmail, setCLientEmail] = useState('')
  const [clientDocument, setCLientDocument] = useState('')
  const [clientName, setCLientName] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedMaterial, setSelectedMaterial] = useState('')
  const [materialQnt, setMaterialQnt] = useState(0)
  const [materials, setMaterials] = useState<MaterialType[]>([])
  const [insertedMaterial, setInsertedMaterial] = useState<insertMaterialProps[]>([])

  const getClients = async () => {
    try {
      const response = await axios.get('http://localhost:5196/api/Client')
      console.log(response.data)
      const clientNames = response.data.map((client: any) => ({
        name: client.fullName, documentId: client.documentId, id: client.id, email: client.email
      }))

      setClients(clientNames)
    } catch (error) {
      console.error('Error fetching clients:', error)
    }
  }

  const getMaterialsByCategory = async (categoryName: string, category: number) => {
    try {
      const response = await axios.get(`http://localhost:5196/api/Material/category/${category}`)
      console.log(response.data)
      const materials = response.data.map((material: any) => ({
        name: material.name, id: material.id, value: material.value
      }))
      setMaterials(materials)

    } catch (error) {
      console.error('Error fetching clients:', error)
    }
    setSelectedCategory(categoryName)
  }

  useEffect(() => {
    getClients()
  }, [])


  const getCLienInputValues = (email: string, documentId:string, name:string, index:number ) => { 
    setCLientEmail(email)
    setCLientDocument(documentId)
    setCLientName(name)
  }

  const insertMaterial = (index:number) => { 
    materials.splice(index)
  }
  return (
    <div>
      <UserSideMenu />
      <div className=''>
        <h1 className='text-4xl font-bold mx-32 my-8'>Criar evento</h1>
        <form action="" className='flex flex-col  w-[800px] rounded-xl bg-opacity-30 bg-slate-400 p-16 mx-auto'>
          <h1 className="font-bold text-2xl">Informações do cliente</h1>
          <div className='flex justify-around my-4'>
            <DropdownMenu>
              <DropdownMenuTrigger className='border-[0.2px] w-[200px] h-[50px] mt-4 bg-white rounded-xl mr-4 font-bold'>{clientName? clientName : 'Selecione um cliente'}</DropdownMenuTrigger>
              <DropdownMenuContent className='bg-white p-2 border-2 rounded-xl mr-72 '>
                {clients.map((client, index) => (
                  <>
                    <DropdownMenuItem onClick={() => getCLienInputValues(client.email, client.documentId, client.name, index)} key={index}>{client.name}</DropdownMenuItem>
                    <hr  className='h-2'/>
                  </>
                  
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex justify-around">

              <div className="mx-2">
                <h1 className='p-1'>Email</h1>
                <h1 className='w-[180px] bg-white text-center border-2 h-[33px] rounded-xl'>{clientEmail}</h1>
              </div>

              <div className="mx-2">
                <h1 className='p-1'>Documento</h1>
                <h1  className='w-[180px] bg-white text-center border-2 h-[33px] rounded-xl'>{clientDocument}</h1>
              </div>
            </div>
          </div>
          <h1 className="font-bold text-2xl my-1">Informações do Evento</h1>
          <div className='my-4 flex justify-around'>
            <Input className='bg-white text-black mx-2' placeholder='Digite o Estado'/> 
            <Input className='bg-white text-black mx-2' placeholder='Digite a Cidade'/> 
            <Input className='bg-white text-black mx-2' placeholder='Digite a Rua'/> 
          </div>
          <h1 className="font-bold text-xl my-1">Selecione os Materiais</h1>
          <div className='flex my-4'>
            <div className="flex justify-around w-full">
            <DropdownMenu>
              <DropdownMenuTrigger className='border-[0.2px] h-[50px] mt-4 mx-2 w-[30%] bg-white rounded-xl mr-4 font-bold'>{selectedCategory ? selectedCategory : 'Categorias'}</DropdownMenuTrigger>
              <DropdownMenuContent className='bg-white p-2 border-2 rounded-xl mr-72 '>
                {MaterialCategory.map((category, index) => (
                  <>
                    <DropdownMenuItem onClick={() => getMaterialsByCategory(category.name, index)} key={index}>{category.name}</DropdownMenuItem>
                    <hr  className='h-2'/>
                  </>      
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className='border-[0.2px] h-[50px] mt-4 mx-2 w-[40%] bg-white rounded-xl mr-4 font-bold'>{selectedMaterial ? selectedMaterial:'Materiais'}</DropdownMenuTrigger>
              <DropdownMenuContent className='bg-white p-2 border-2 rounded-xl mt-2 '>
                {materials.map((material, index) => (
                  <div key={index}>
                    <DropdownMenuItem onClick={() => setSelectedMaterial(material.name)}  key={index}>{material.name}</DropdownMenuItem>
                    <hr  className='h-2'/>
                  </div>      
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
              <Input onChange={(e) => setMaterialQnt(e.target.valueAsNumber)} type='number' className='bg-white w-[20%] h-[50px] rounded-xl mt-4 mx-2' placeholder='Quantidade' /> 
              <Button  className='w-[10%] mx-2 mt-4 h-[50px] rounded-full bg-white'><PlusCircleIcon className='h-8 w-8' /></Button> 
            </div>
          </div>
        </form>
        <div>
          <h1 className='p-16'>Informações do seu evento</h1>
        </div>
      </div>
    </div>
  )
}

export default CreateEvent
