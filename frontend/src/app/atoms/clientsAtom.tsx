import { atom } from 'jotai'

export type ClientProps = {
  id: string
  name: string
  documentId: string
  email: string
}

export const clientsAtom = atom<ClientProps[]>([])
