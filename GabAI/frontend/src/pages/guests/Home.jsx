import SplineCube from "@/components/SplineCube"
import { Link } from "react-router-dom"

function Home() {
  return (
   <section className="min-h-screen h-[calc(100vh+100px)] bg-gradient-to-tr from-zinc-900 to-zinc-950 grid grid-cols-2">
    <article className="p-6 gap-6 text-white flex justify-center flex-col border-[0.5px] border-gray-900">
      <h1 className="text-heading-1 font-black leading-snug text-left">Fin<span className="text-secondary">Vue</span> your ultimate financial tracking companion</h1>
      <p className="text-white font-regular text-subtitle font-semi-bold text-left">Take control of your finances with ease and precision, all in one intuitive platform.</p>
      <Link to={'/login'}><button className="primary-btn w-1/4 p-4">Get Started</button></Link>
    </article>
    <article className="overflow-hidden">
      <SplineCube/>
    </article>
   </section>
  )
}

export default Home
