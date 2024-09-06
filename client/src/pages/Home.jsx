import React from 'react'
import ImageSlider from '../components/homepage/ImageSlider'
import ListingHomePage from '../components/homepage/ListingHomePage'
import Footer from '../components/headerandfooter/Footer'
import ListingHomePage2 from '../components/homepage/ListingHomePage2'

function Home() {
  return (
    <div className='dark:bg-slate-800' >
      <div className=' p-6 w-full'>

      </div>
      <ImageSlider/>
      <ListingHomePage/>
      <ListingHomePage2/>
      <Footer />
    </div>
  )
}

export default Home