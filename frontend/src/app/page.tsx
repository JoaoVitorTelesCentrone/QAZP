import Image from 'next/image'
import Header from './components/Header'
import Call from './components/Call'
import Plan from './components/Plan'
import WhatWeDo from './components/WhatWeDo'
import { Toaster, toast } from 'sonner'
import Footer from './components/Footer'

export default function Home() {
  return (
    <div className="">
      <Toaster />
      <Header />
      <Call />

      <Plan />

      <WhatWeDo />
      <Footer />
    </div>
  )
}
