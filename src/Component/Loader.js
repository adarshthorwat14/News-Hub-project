import React from 'react'
import loader from './loader.gif'

export default function Loader() {
  return (
    <div className='d-flex justify-content-center align-items-center my-5' >
      <img src={loader} alt="Loading" />
    </div>
  )
}
