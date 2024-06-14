import { Atom, atom } from 'jotai'

export const getQuoteAtom = atom({
  firstName: '',
  lastName: '',
  email: '',
  estimatedAudience: '',
  eventType: '',
  phoneNumber: '',
})
