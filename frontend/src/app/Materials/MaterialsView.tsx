import React, { useMemo } from 'react'
import { materialColumns } from './columns'
import ClipLoader from 'react-spinners/ClipLoader'
import UserSideMenu from '../components/UserHeader'
import { CiPenpot } from 'react-icons/ci'
import { TbBasketPlus } from 'react-icons/tb'
import CreateMaterialModal from './components/createMaterialModal'
import { MaterialProps } from './types/material'
import { Button } from 'antd'
import GenericTable from '../components/GenericTable'
import { Input } from '@/components/ui/input'

interface MaterialsViewProps {
    materials: MaterialProps[]
    loading: boolean
    openModal: boolean
    setOpenModal: (open: boolean) => void
    refetch: () => void
}

const MaterialsView: React.FC<MaterialsViewProps> = ({
    materials,
    loading,
    openModal,
    setOpenModal,
}) => {
    const columns = useMemo(() => materialColumns(), [])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <ClipLoader size={50} color={'#123abc'} loading={loading} />
            </div>
        )
    }

    return (
        <div>
            {openModal && <CreateMaterialModal isVisible={openModal} onClose={() => setOpenModal(false)} />}
            <UserSideMenu />
            <div className="bg-tertiary min-h-screen">
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
                <div className="bg-tertiary ml-56 mr-10">
                    <GenericTable columns={columns} data={materials}>
                        {(table) => (
                            <>
                                    <Input
                                        placeholder="Filtrar por nome"
                                        value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                                        onChange={(e) =>
                                            table.getColumn('name')?.setFilterValue(e.target.value)
                                        }
                                        className="max-w-sm my-10 mx-auto border-primary text-center font-bold"
                                    />
                            </>
                        )}
                    </GenericTable>
                </div>
            </div>
        </div>
    )
}

export default MaterialsView