import React from 'react'

const SearchPageCardShimmer = () => {
  return (
    <>
      {
        Array(10).fill().map((_, index) => (

          <div
            key={index}
            className="shimmer-box w-full h-[250px] bg-gray-200 overflow-hidden relative rounded-2xl"
          >
            <div className="shimmer absolute inset-0"></div>
          </div>

        ))
      }
    </>
  )
}

export default SearchPageCardShimmer