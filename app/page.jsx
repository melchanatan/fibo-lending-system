import Feed from "@components/Feed"
import { Router, useRouter } from 'next/navigation'
import Footer from '@components/Footer';


const Home = () => {
  
  return (
    <section className="w-full md:px-4 lg:px-8 justify-items-start mt-10">
        <h1 className="head_text max-md px-8 sm:px-6">
            FRA161 lending service
        </h1>
        <Feed/>
        <Footer />
    </section>
  )
}

export default Home;