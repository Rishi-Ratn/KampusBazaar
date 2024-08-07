import React from 'react'
import ImageSlider from '../components/ImageSlider'
import ListingHomePage from '../components/ListingHomePage'
import Footer from '../components/Footer'
import ListingHomePage2 from '../components/ListingHomePage2'

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