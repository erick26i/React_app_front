import { useState, useEffect } from 'react'
import { useToken } from '../Context/TokenContext'

const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [token] = useToken()
  
  useEffect(() => {
    const loadData = async () => {
      try {
        let params = !token ? {} : {
          headers: { 'Authorization':  'Bearer ' + token }
        }
        const res = await fetch(url, params)
        if (!res.ok) throw new Error(res.statusText)
        const data = await res.json()
        setData(data)
      } catch (err) {
        console.warn(err)
      }
    }
    loadData()
  }, [url, token])

 
   return {data, setData} 
}

export default useFetch