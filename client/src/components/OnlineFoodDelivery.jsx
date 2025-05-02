import React from 'react'
import RestaurantCard from './RestaurantCard'

const OnlineFoodDelivery = ({ data = [], title }) => {
  return (
    <div className='mt-7'>
      <h2 className='font-bold text-2xl'>{title}</h2>
      <div className='px-2 mt-6 grid grid-cols-2 md:grid-cols-4 gap-6'>
        {data.map(({ info, cta: { link } }) => (
          <div key={info?.id} className='duration-300 hover:scale-95'>
            <RestaurantCard {...info} link={link} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default OnlineFoodDelivery