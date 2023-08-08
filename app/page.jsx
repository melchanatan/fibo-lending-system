import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="w-full px-2 md:px-4 lg:px-8 justify-items-start">
        <h1 className="head_text max-md">
            FRA161 Lending system
        </h1>
        <Feed/>
    </section>
  )
}

export default Home;