import Image from "next/image";
import Header from "./components/Header";
import Call from "./components/Call";
import Plan from "./components/Plan";
import WhatWeDo from "./components/WhatWeDo";

export default function Home() {
  return (
    <>
      <Header />
      <Call />
      <Plan />
      <WhatWeDo />
    </>
  );
}
