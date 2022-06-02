import Item from '@/components/Item'

const Home = ({ data }) => {
  return (
    <div className="flex w-full flex-col items-center text-center">
      <h1 className="mt-10 text-3xl font-bold text-gray-100 md:text-5xl">TV Shows</h1>
      <h2 className="text-md mt-5 max-w-[60vw] text-gray-200 md:text-xl">
        These days, the small screen has some very big things to offer. From sitcoms to dramas to travel and talk shows, these are all the best shows
        on TV.
      </h2>
      <div className="flex flex-row flex-wrap items-start justify-center gap-10 py-10">
        {data
          .filter((item) => item.show.image)
          .map((item, index) => (
            <Item key={index} {...item['show']} />
          ))}
      </div>
    </div>
  )
}

export default Home

export async function getServerSideProps() {
  const fetchCall = await fetch('https://api.tvmaze.com/schedule?country=US&date=2014-12-01')
  const data = await fetchCall.json()
  return {
    props: {
      data,
    },
  }
}
