import { useEffect, useState } from "react";
import api from '../../api'
import toast from 'react-hot-toast'


const useDashboard = (token) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)

  useEffect(() => {
    if (token) {
      setLoading(true);
      api.fetchDashboardData()
        .then(response => {
          if (response.ok) {
            setData(response.data)
          } else {
            toast.error(`Could not fetch dashboard, please contact administrator.`)
          }
        }).finally(() => {
          setLoading(false)
      })
    }
  }, [token])

  return {
    data,
    loading,
  }
}

export default useDashboard