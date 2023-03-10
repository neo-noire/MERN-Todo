import axios from '../utils/axios'
import React, { useEffect, useState } from 'react'

export const useFetch = (url, params) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                if (params) {
                    const { data } = await axios.get(url, { params: params });
                    setData(data)
                } else {
                    const { data } = await axios.get(url);

                    setData(data)
                }
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [url])

    return { data, error, loading }

}
