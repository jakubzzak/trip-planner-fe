import { useEffect, useState } from 'react'

const useToken = () => {
  // use localStorage to share data across the browser, sessionStorage persist data within one session
  const [token, setToken] = useState(null)

  useEffect(() => {
    const valueString = localStorage.getItem('token')
    let val
    if (valueString) {
      val = JSON.parse(valueString)
    }
    setToken(val)
  }, [])

  const saveToken = (token) => {
    localStorage.setItem('token', JSON.stringify(token))
    setToken(token)
  }

  return {
    setToken: saveToken,
    token
  }
}

export default useToken
