import { DataTable } from '@/components/ui/data-table';
import React from 'react'
import { Events, columns } from './columns';

const mockData: Events[] = [
    { id: '1', name: "John", amountOfPeople: 30, type: "casamento",  date: '14/05/2024' },
    { id: '2', name: "Alice", amountOfPeople: 25, type: "velório",  date: '01/04/2027' },
    { id: '3', name: "Bob", amountOfPeople: 35, type: "casamento", date: '14/05/2025' },
    { id: '3', name: "Bob", amountOfPeople: 35, type: "casamento", date: '14/05/2025' },
    { id: '3', name: "Bob", amountOfPeople: 35, type: "casamento", date: '14/05/2025' },
    { id: '3', name: "Bob", amountOfPeople: 35, type: "casamento", date: '14/05/2025' },
    { id: '3', name: "Bob", amountOfPeople: 35, type: "casamento", date: '14/05/2025' },
    { id: '3', name: "Bob", amountOfPeople: 35, type: "casamento", date: '14/05/2025' },
    { id: '3', name: "Bob", amountOfPeople: 35, type: "casamento", date: '14/05/2025' },
    { id: '3', name: "Bob", amountOfPeople: 35, type: "casamento", date: '14/05/2025' },
    { id: '3', name: "Bob", amountOfPeople: 35, type: "casamento", date: '14/05/2025' },
    { id: '3', name: "Bob", amountOfPeople: 35, type: "casamento", date: '14/05/2025' },
    { id: '3', name: "Bob", amountOfPeople: 35, type: "casamento", date: '14/05/2025' },
    { id: '3', name: "Bob", amountOfPeople: 35, type: "casamento", date: '14/05/2025' },
    { id: '3', name: "Bob", amountOfPeople: 35, type: "casamento", date: '14/05/2025' },
    { id: '3', name: "Bob", amountOfPeople: 35, type: "casamento", date: '14/05/2025' },
    { id: '3', name: "Bob", amountOfPeople: 35, type: "casamento", date: '14/05/2025' },
    { id: '3', name: "Bob", amountOfPeople: 35, type: "casamento", date: '14/05/2025' },
  ];


const NextEvents = () => {
  return (
    <div className='m-32 text-primary'>
        <h1 className='my-4 font-bold uppercase text-4xl text-secondary-foreground'>Proximos eventos</h1>
        <DataTable columns={columns} data={mockData} />
    </div>
  )
}

export default NextEvents
