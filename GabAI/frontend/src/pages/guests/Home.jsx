import Image from "@/assets/dog.png"
import { Link } from "react-router-dom"

function Home() {
  return (
   <section className="min-h-screen h-200 bg-gray-800 grid grid-cols-2">
    <article className="p-6 gap-6 bg-gray-200 text-white flex justify-center flex-col border-[0.5px] border-gray-800">
      <h1 className="text-heading-1 font-black leading-snug text-left text-gray-800">Gab<span className="text-gray-500">AI</span> the Ultimate Financial Companion "Budget more, Learn more"</h1>
      <p className="text-gray-800 font-regular text-subtitle font-semi-bold text-left">Take control of your finances with ease and precision, all in one intuitive platform.</p>
      <Link to={'/login'}><button className="primary-btn w-1/4 p-4 bg-gray-800 text-white">Get Started</button></Link>
    </article>
    <article className="flex justify-center items-center">
      <img src={Image} className="w-3/4 h-auto" />
    </article>
   </section>
  )
}

export default Home
