import React, { useEffect, useState } from 'react'
import SideBar from './components/SideBar'
import Main from './components/Main'
import Footer from './components/Footer'

export default function App() {
  const [data, setData] = useState(null)
  const [showModel,setShowModel] = useState(false);

  function handleToggleModal() { 
    setShowModel(!showModel)
  }

  useEffect(()=>{
    async function fetchAPIData(){
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
      const url = 'https://api.nasa.gov/planetary/apod'+`?api_key=${NASA_KEY}`
      const today = (new Date()).toDateString()
      const localKey = `NASA-${today}`
      if(localStorage){
        if(localStorage.getItem('localKey')){
          const apiData = localStorage.getItem('localKey')
          setData(JSON.parse(apiData))
          console.log('Fetched from CACHE today')
          return 
        }
        // localStorage.clear()
      }
      try {
        const res = await fetch(url)
        const apiData = await res.json()
        localStorage.setItem('localKey',JSON.stringify(apiData))
        setData(apiData)
        console.log('Fetched from API today')
        console.log('DATA\n',data);
      } catch(err){
        console.log(err.message);
      }
    }
    fetchAPIData()
  },[])

  return (
    <>
      {data ? (<Main data={data} />) : (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
      )}
      {showModel && (
        <SideBar data={data}  handleToggleModal={handleToggleModal} />
      )}

      
      <Footer data={data} handleToggleModal={handleToggleModal}/>
    </>
  )
}
