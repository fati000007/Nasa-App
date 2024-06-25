import React from 'react'

export default function (props) {
  const {data} = props
  return (
    <div className="imgContainer">
      <img src={data.url} alt={data.title || 'bg-img'} className="bgImage" />
    </div>
      
  )
}
