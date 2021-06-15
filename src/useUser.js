import { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import securedAPI, { unsecuredAPI } from './api'
import toast from 'react-hot-toast'


const useUser = () => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (user === null) {
      onLogin({ email: '', password: '' })
    }
  }, [])

  const onLogin = (data) => {
    setLoading(true)
    return unsecuredAPI.login(data)
      .then(response => {
        if (response.ok && response.data.ok) {
          setUser(response.data.data)
        } else {
          setUser(null)
        }
        return response.ok && response.data.ok
      }).catch(error => {
        toast.error(`Login failed => ${error}`)
      }).finally(() => {
        setLoading(false)
      })
  }
  const onLogout = () => {
    setLoading(true)
    return securedAPI.logout()
      .then(response => {
        if (response.ok && response.data.ok) {
          setUser(null)
        } else {
          toast.error(`[${response.status}] Logout failed`)
        }
        return response.ok && response.data.ok
      }).catch(error => {
        toast.error(`Logout failed => ${error}`)
      }).finally(() => {
        setLoading(false)
      })
  }

  return {
    user,
    loading,
    login: onLogin,
    logout: onLogout,
  }
}

export default useUser
