import Image from "next/image";
import Header from "./components/Header";
import Call from "./components/Call";
import Plan from "./components/Plan";
import WhatWeDo from "./components/WhatWeDo";
import { Toaster, toast } from 'sonner'

export default function Home() {
  return (
    <>
      <Toaster />
      <Header />
      <Call />
      <Plan />
      <WhatWeDo />
    </>
  );
}
